const Rider = require('./model');
var multer = require('multer');
const Restaurant = require('../Restaurant/model')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../../config/keys')
/* CREATE New Rider */

const riderorders = function (req, res, next) {

  Rider
    .findOne({ _id: req.user._id })

    .populate("Orders.order")
    .then(function (restaurant) {
      console.log(JSON.stringify(restaurant, null, "\t"))
      res.json(restaurant);
    })
    .catch(function (err) {
      res.json(err);
    });

}

const createRider = function (req, res, next) {
  const rider = new Rider({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    Phonenumber: req.body.phoneNumber,
    transport: req.body.transport,
    Address: req.body.Address,
    rname: req.body.restaurantname,
    createdBy: req.user.email
  })
  rider
    .save()
    .then(function (dbReview) {
      return Restaurant.findOneAndUpdate({ name: req.body.restaurantname },
        {
          $push: {
            Riders: {
              rider: dbReview._id,
            }
          }
        },

        { new: true });
    })
    .then(function (dbProduct) {
      console.log(dbProduct)
      res.json(dbProduct);
    })
    .catch(function (err) {

      res.json(err);
    });




};
/* Get All Available  Riders */

const getAllRiders = function (req, res, next) {
  Rider.find({ createdBy: req.user.email }).exec(function (error, results) {
    if (error) {
      console.log(error)
    }

    if (!results) {
      console.log("no found")

    }
    else {


      res.json(results);
    }
  });

};

const deleterider = function (req, res, next) {




  Rider
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(function (dbProduct) {

      res.json("Deleted");
    })
    .catch(function (err) {

      res.json(err);
    });
};


const getspecificrider = function (req, res, next) {

  let id = req.params.id
  Rider
    .findById(id)
    .exec()
    .then(food => res.json(food))
    .catch(err => next(err));
}

const updaterider = function (req, res, next) {
  Rider
    .findById(req.params.id, function (err, data) {
      if (!data)
        res.status(404).send('data is not found');

      else {
        data.name = req.body.name,
          data.email = req.body.email,
          data.password = req.body.password,
          data.Phonenumber = req.body.phoneNumber,
          data.transport = req.body.transport,
          data.Address = req.body.Address


        data
          .save()
          .then(restaurant => res.json("Rider updated"))
          .catch(err => next(err));



      }
    })


};
const Login = async function (req, res, next) {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" })
  }
  const rider = await Rider.find({ email: email })

  if (!rider) {
    return res.status(422).send({ error: "must provide email or password" })
  }
  try {

    for (const id of rider) {
      const { _id } = id;




      await Rider.find({ password: password })

      const token = jwt.sign({ userId: _id }, jwtkey)
      console.log(token)
      res.send({ token })

    }
  }
  catch (err) {
    return res.status(422).send({ error: "must provide email or password" })
  }


}





module.exports = {
  createRider,
  getAllRiders,
  Login, riderorders, getspecificrider, updaterider, deleterider

};