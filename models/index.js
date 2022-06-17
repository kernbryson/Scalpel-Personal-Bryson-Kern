const User = require('./User');
const Category = require('./Category');
const Address = require('./Address');
const Item = require('./Item');
const OrderDetail = require('./OrderDetail');
const OrderHeader = require('./OrderHeader');
const Payment = require('./Payment');
const Rental = require('./Rental');
const Review = require('./Review');
const Cart = require('./Cart')

User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Address, {
  foreignKey: 'user_id',
});

Address.belongsTo(User, {
  foreignKey: 'user_id',
});

Payment.hasOne(Address, {
  foreignKey: 'address_id',
  onDelete: 'CASCADE',
});

Item.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Item.hasOne(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(OrderHeader, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

OrderHeader.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// OrderHeader.hasOne(Payment, {
//   foreignKey: 'payment_id',
//   onDelete: 'CASCADE'
// });

Payment.hasMany(OrderHeader, {
  foreignKey: 'payment_id',
});

// OrderHeader.hasOne(Payment, {
//   foreignKey: 'payment_id'
// })

OrderHeader.hasMany(OrderDetail, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

OrderDetail.belongsTo(OrderHeader, {
  foreignKey: 'orderheader_id',
  onDelete: 'CASCADE',
});

OrderDetail.belongsTo(Item, {
  foreignKey: 'item_id'
})

Item.hasMany(OrderDetail, {
  foreignKey: 'item_id'
})


User.hasMany(Payment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Payment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Item.hasMany(Review, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE',
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Item, {
  foreignKey: 'item_id'
})

User.hasMany(Rental, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Rental.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Rental.hasMany(User, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE',
});

Rental.hasMany(Item, {
  foreignKey: 'item_id'
})

Item.belongsTo(Rental);

Item.hasMany(Rental, {
  foreignKey:'item_id'
})

Item.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Item),
  {
    foreignKey: 'category_id',
  };

Cart.belongsTo(User, {
  foreignKey: 'user_id'
});



Rental.hasMany(OrderDetail, {
foreignKey:'rental_id'
});

OrderDetail.hasMany(Rental)

User.hasOne(Cart)

Cart.belongsTo(Item,
  {
    foreignKey:'item_id'
  });

Review.belongsTo(User, {
  foreignKey:'user_id'
})

module.exports = {
  User,
  Category,
  Address,
  Item,
  OrderDetail,
  OrderHeader,
  Payment,
  Rental,
  Review,
  Cart
};
