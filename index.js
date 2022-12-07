const express = require('express');
require('./Db/config')
const User = require("./Db/User");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {

  let user = new User(req.body);
  let result = await user.save();


  result = result.toObject();
  delete result.password;

  resp.send(result);

})
app.post("/login", async (req, resp) => {


  if (req.body.password && req.body.email) {

    let user = await User.findOne(req.body).select("-password");

    if (user)
      resp.send(user)
    else
      resp.send("match Nhi kar raha kisi se")
  }
  else
    resp.send("no user found")
})
app.get("/", (req, resp) => {


  resp.send("working ")
});
app.listen(5000);