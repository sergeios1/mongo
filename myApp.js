require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = mongoose.Schema({
  name:{type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);
let casdfsdf = new Person({name:"yay",age: 14, favoriteFoods: ['pizza']});
console.log(casdfsdf);

let createAndSavePerson = function(done){
  let dave = new Person({name: "charlie", age: 21, favoriteFoods: ["milk","milksteak"]});

  dave.save(function(err,data){
    if(err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "charlie",age:39,favoriteFoods: ["milksteak","milksausage"]},
  {name: "dennis",age:39,favoriteFoods: ["macsfamousmacandcheese","wolf cola"]}
]
const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  }) 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err,data) => {
    if(err) return console.error(err);
    done(null,data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err,data) => {
    if(err) return console.error(err);
    done(null,data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err,data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err,person) => {
    if(err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err,newPerson) => {
      if(err)return console.error(err);
      done(null, newPerson);
    });
    
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId},(err,data) => {
    if(err)return console.error(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data) => {
    if(err)return console.error(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({name: 1, age: 0, favoriteFoods: 1}).exec((err,data) => {
    if(err)return console.error(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;