const sequelize = require('../config/connection');
const { Op } = require("sequelize");
// const bcrypt = require('bcrypt');

const { User, 
        Category,
        Address,
        Item,
        OrderDetail,
        OrderHeader,
        Payment,
        Rental,
        Review} = require('../models');

const userData = require('./userData.json');
const itemData1 = require('./itemData-daeun.json');
const itemData2 = require('./itemseeds-bryson.json');
const itemData3 = require('./itemseeds-arashk.json');
const addresses = require('./address.json');
const category = require('./category.json');
const reviews = require('./review.json');
const rentals = require('./rentals.json')
const payments = require('./credit_card.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const createSal= await User.create(
    {
      "first_name": "Sal",
      "last_name": "Barker",
      "email": "sal@hotmail.com",
      "password": "password12345",
      "is_admin": true,
      "phone":"6788231111",
      "birth_date":"10/19/1970",
      "active": true
    },
    {
    individualHooks: true,
    returning: true,
    }
  );

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  const categories = await Category.bulkCreate(category, {
    individualHooks: true,
    returning: true,
  });

  for (const item of itemData1) {
    await Item.create({
      ...item,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      category_id:1,
    });
  };

  for (const item of itemData2) {
    await Item.create({
      ...item,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      category_id:2,
    });
  };

  for (const item of itemData3) {
    await Item.create({
      ...item,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      category_id: 3
    });
  };

  await Item.update(
    {
      user_id: '1'
    },
    {
      where: {
        id: {
          [Op.or]: [1,2,3,4,5,6]
        }
      }
  });

  for (const address of addresses) {
    await Address.create({
      ...address,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  };

  

  await Address.update(
    {
      type: 'BILL',
      user_id: '1'
    },
    {
      where: {
        id: {
          [Op.or]: [1,2]
        }
      }
  });

  await Address.update(
    {
      type: 'SHIP',
      user_id: '1'
    },
    {
      where: {
        id: {
          [Op.or]: [3,4]
        }
      }
  });

  const userAddressData = await Address.findAll({
    where: {
      type: 'BILL'
    },
    raw : true ,
      nest : true
  });
  
  let i=0;
  // console.log (userAddressData);
    for (const address of userAddressData) {
      // console.log(address['user_id']);
      await Payment.create({
        ...payments[i],
        last4: payments[i].card_num.slice(12),
        user_id: address['user_id'],
      });
      i++;
    };

  const items = await Item.findAll();
      const userItemData = await Item.findAll({
      where: {
        is_rentable: true,
        is_rented: true
      },
      raw : true ,
        nest : true
    });

let z=0
    for (let i=0; i<Math.floor(userItemData.length/2); i++) {
      await Rental.create({
        start_date: rentals[z].start_date,
        return_date: rentals[z].return_date,
        user_id: userItemData[z].user_id,
        rented_to_user_id: userAddressData[Math.floor(Math.random() * userAddressData.length)].user_id,
        item_id: userItemData[z].id,
      });
      z++
    };

    //Give the top 3 rentals to Sal
    for(let x=1; x<=3; x++){
    await Rental.update(
      {
        user_id: '1',
        item_id: x
      },
      {
        where: {
          id: x
        }
    });
  };

    //Sal is renting 8 9 and 10
    await Rental.update(
      {
        rented_to_user_id: '1',
      },
      {
        where: {
          id: {
            [Op.or]: [8,9,10]
          }
        }
    });

    const rentedItems = await Rental.findAll({ raw : true, nest : true})
    // console.log(rentedItems);
    for(let i=0; i<rentedItems.length; i++){

      console.log(rentedItems[i].return_date)
      await Item.update(
      {
        return_date: rentedItems[i].return_date
      },
      {
        where: {
          id: rentedItems[i].item_id +1
        }
    });
  };

  for (const review of reviews) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      item_id: items[Math.floor(Math.random() * items.length)].id
    });
  };


   await Review.update({item_id: 1,},{where: {id: 1}});
   await Review.update({item_id: 2,},{where: {id: 2}});
   await Review.update({item_id: 3,},{where: {id: 3}});
   await Review.update({item_id: 4,},{where: {id: 4}});
   await Review.update({item_id: 5,},{where: {id: 5}});
   await Review.update({item_id: 6,},{where: {id: 6}});
   await Review.update({item_id: 1,},{where: {id: 7}});
   await Review.update({item_id: 2,},{where: {id: 8}});
   await Review.update({item_id: 3,},{where: {id: 9}});
   await Review.update({item_id: 4,},{where: {id: 10}});
   await Review.update({item_id: 5,},{where: {id: 11}});
   await Review.update({item_id: 6,},{where: {id: 12}});
   await Review.update({item_id: 1,},{where: {id: 13}});
   await Review.update({item_id: 2,},{where: {id: 14}});
   await Review.update({item_id: 3,},{where: {id: 15}});
   await Review.update({item_id: 4,},{where: {id: 16}});
   await Review.update({item_id: 5,},{where: {id: 17}});
   await Review.update({item_id: 6,},{where: {id: 18}});


 const reviewItems = await Review.findAll({
  attributes: {
    include: [
      [sequelize.fn('AVG', sequelize.col('rating')), 'n_rating']
    ]
  },
  group: 'item_id',
    raw : true, 
    nest : true
  });

    // console.log(reviewItems);
    for(let i=0; i<reviewItems.length; i++){

      // console.log(reviewItems[i].item_id, reviewItems[i].n_rating)
      await Item.update(
      {
        rating: reviewItems[i].n_rating
      },
      {
        where: {
          id: reviewItems[i].item_id
        }
    });
  };



  
  for(let i=0; i<rentedItems.length; i++){

    // console.log(rentedItems[i].return_date)
    await OrderDetail.create(
    {
      item_id: rentedItems[i].item_id,
      rental_id: rentedItems[i].id,
      is_rental:true,
      qty:1,
      ship_date:rentedItems[i].start_date,
    });
};

// const orderData = await OrderDetail.findAll({
//   include: [{ model: Item,
//     include: [{model: Rental}]
//   }],
//   raw : true, 
//     nest : true
// });

const orderRental = await Rental.findAll({
  include: [{model: User,
            include:[{model: Payment}, {model: Address,
            where:
          {
            type: 'BILL'
          }}] }],
  group: 'rented_to_user_id',
    raw : true, 
    nest : true
  });



 for(let i=0; i<orderRental.length; i++){

  // console.log(orderRental[i])
  await OrderHeader.create(
  {
    user_id: orderRental[i].user_id,
    payment_ID: orderRental[i]['user']['payments'].id,
    status:'SHIPPED',
    bill_to_addr_id:orderRental[i]['user']['addresses'].id,
    ship_date: orderRental[i].start_date,
  });
};

const shipAddress = await OrderHeader.findAll({
  include: [{model: User,
    include:[{model: Address,
    where:
  {
    type: 'SHIP'
  }}]}],
  raw : true, 
    nest : true
})

for(let i=0; i<shipAddress.length; i++){

  // console.log(orderRental[i])
  await OrderHeader.update(
  {
    ship_to_addr_id: shipAddress[i]['user']['addresses'].id,
  },
  {
  where: {
    user_id: shipAddress[i].user_id
  }
} );
};


  console.log(shipAddress[0].user_id)
  process.exit(0);

 
};


seedDatabase();
