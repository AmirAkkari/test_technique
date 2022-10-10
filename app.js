const express = require("express");
const axios = require("axios");
const { response } = require("express");
const cors = require("cors");
const compression = require('compression')
require("dotenv").config();
const bodyParser = require("body-parser");
const dataRouter = require("./routes/data.routes")
const db = require("./models"); // import connexion object with models
const app = express();
const TourOne = require("./models/TourOne");
const TourTwo = require("./models/TourTwo");
const Quartiers = require("./models/Quartiers")
const PORT = 3001;

// sync models and tables if there's changes
db.sequelize
  .sync({ force:true })
  .then(() => {
    console.log("Sync db if there's changes.");
    // getTourOne();
    // getTourTwo();
    // getQuartiers();
  })
  .catch((err) => console.log("Error in syncing db: " + err.message));


// Test db
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Databes connected...")
    
})
  .catch((err) => console.log("Err " + err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression())
app.use("/data" , dataRouter);

const getTourOne = () => {
  axios
    .get(
      "https://opendata.paris.fr/api/records/1.0/search/?dataset=elections-presidentielles2022-1ertour&q=&facet=id_bvote&facet=arr_bv"
    )
    .then((response) => {
      response.data.records.forEach(async (record) => {
        let field = record.fields;
        try {
            await TourOne.create({
              annee: field.annee,
              tour: 1,
              date: field.date_tour,
              num_circ: field.circ_bv,
              num_quartier: field.quartier_bv,
              num_arrond: field.arr_bv,
              num_sec: field.sec_bv,
              num_bureau: field.num_bureau,
              nb_inscrit: field.nb_inscrit,
              nb_emargement: field.nb_emargement,
              nb_votant: field.nb_votant,
              nb_vote_blanc: field.nb_vote_blanc,
              nb_vote_null: field.nb_vote_nul,
              nb_exprime: field.nb_exprime,
              lassalle_jean: field.lassalle_jean,
              pecresse_valerie: field.pecresse_valerie,
              zemmour_eric: field.zemmour_eric,
              hidalgo_anne: field.hidalgo_anne,
              dupont_aignan_nicolas: field.dupont_aignan_nicolas,
              roussel_fabian: field.roussel_fabien,
              jadot_yannick: field.jadot_yannick,
              le_pen_marine: field.le_pen_marine,
              arthaud_nathalie: field.arthaud_nathalie,
              melenchon_jean_luc: field.melenchon_jean_luc,
              poutou_philippe: field.poutou_philippe,
              macron_emmanuel: field.macron_emmanuel,
            });
        } catch (error) {
            console.log(error.message)
        }
      });
    })
    .catch((err) => {
      console.log(`Error fetching records ${err}`);
    });
};

const getTourTwo = () => {
  axios
    .get(
      "https://opendata.paris.fr/api/records/1.0/search/?dataset=elections-presidentielles-2022-2emetour&q=&facet=id_bvote&facet=arr_bv"
    )
    .then((response) => {
      response.data.records.forEach(async (record) => {
        let field = record.fields;
        try {
            await TourTwo.create({
              annee: field.annee,
              tour: 2,
              date: field.date_tour,
              num_circ: field.circ_bv,
              num_quartier: field.quartier_bv,
              num_arrond: field.arr_bv,
              num_sec: field.sec_bv,
              num_bureau: field.num_bureau,
              nb_inscrit: field.nb_inscrit,
              nb_emargement: field.nb_emargement,
              nb_votant: field.nb_votant,
              nb_vote_blanc: field.nb_vote_blanc,
              nb_vote_null: field.nb_vote_nul,
              nb_exprime: field.nb_exprime,
              le_pen_marine: field.le_pen_marine,
              macron_emmanuel: field.macron_emmanuel,
            });
        } catch (error) {
            console.log(error.message)
        }
      });
    })
    .catch((err) => {
      console.log(`Error fetching records ${err}`);
    });
};

const getQuartiers = () => {
  axios
    .get(
      "https://opendata.paris.fr/api/records/1.0/search/?dataset=quartier_paris&q=&rows=80&sort=-c_ar&facet=l_qu&facet=c_ar"
    )
    .then((response) => {
        response.data.records.forEach(async (record) => {
            let field = record.fields;
            try {
                await Quartiers.create({
                  c_qu: field.c_qu,
                  c_ar: field.c_ar,
                  l_qu: field.l_qu,
                });
            } catch (error) {
                console.log(error.message);
            }
          });
    })

    .catch((err) => {
      console.log(`Error fetching records ${err}`);
    });
};


getTourOne()
getTourTwo()
app.listen(PORT , ()=>{
    console.log(`App Working on port ${PORT}`);
})
