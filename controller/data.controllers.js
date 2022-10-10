
const TourOne = require("../models/TourOne");
const TourTwo = require("../models/TourTwo");
const Quartier = require("../models/Quartiers");
const { sortObjectDesc, candidatsTour1, candidatsTour2 } = require('../utils')
const Sequelize = require('sequelize');
const { Op } = require('sequelize')


// GET ratio votants / inscrit (1er et 2eme tour)
const votantsInscrits = async (req, res) => {

  const queryTour = req.query.tour;
  const Tour = queryTour == 1 ? TourOne : TourTwo;
  
  try {
    
    // total des votants
    const totalVotants = await Tour.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('nb_votant')), 'total_votants'], 
        [Sequelize.fn('sum', Sequelize.col('nb_inscrit')), 'total_inscrits']],
      raw: true,
    });
  
    // calcul du pourcentage des votants / inscrits
    const votantsInscrits = totalVotants[0]["total_votants"] / totalVotants[0]["total_inscrits"] * 100
  
    // return ratio in json
    return res.json(votantsInscrits);
  } catch (error) {

    return res.json({ error: error.message });

  }

};
/****************************************************************/
// GET ratio votants / inscrit (1er et 2eme tour)
const pourcentageBlanc = async (req, res) => {

  const queryTour = req.query.tour;
  const Tour = queryTour == 1 ? TourOne : TourTwo;
  
  try {
    
    // total des votants
    const totalVotes = await Tour.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('nb_votant')), 'total_votants'], 
        [Sequelize.fn('sum', Sequelize.col('nb_vote_blanc')), 'total_blanc']],
      raw: true,
    });
  
    // calcul du pourcentage des votants / inscrits
    const pourcentage = totalVotes[0]["total_blanc"] / totalVotes[0]["total_votants"] * 100
  
    // return ratio in json
    return res.json(pourcentage);
  } catch (error) {

    return res.json({ error: error.message });

  }

};
/****************************************************************/
// GET totaux par candidats (ordre decroissant + 1er et 2eme tour)
const votesParCandidat = async (req, res) => {

  const queryTour = req.query.tour;
  let attributes = [], Tour;
  
  if(queryTour == 1) {
    Tour = TourOne;
    candidatsTour1.map(candidat => attributes.push([Sequelize.fn('sum', Sequelize.col(candidat)), candidat]))
  } else {
    Tour = TourTwo;
    candidatsTour2.map(candidat => attributes.push([Sequelize.fn('sum', Sequelize.col(candidat)), candidat]))
  }

  try {
    
    // total des votants
    const votesParCandidats = await Tour.findAll({
      attributes,
      raw: true,
    });
  
    const votesParCandidatsOrdreDecs = sortObjectDesc(votesParCandidats[0])
  
    // return ratio in json
    return res.json(votesParCandidatsOrdreDecs);

  } catch (error) {

    return res.json({ error: error.message});
  }

};
/****************************************************************/
// GET données pour graphe dynamique
const dynamique = async (req, res) => {

  const { value, place, candidat, tour } = req.query;
  /**
   * "tour" is used to choose the right table
   * "value" is the attribute to get 
   * "place" is used as group by
   * "candidat" is used as the attribute if value is nb_votes 
   */

  const Tour = tour == 1 ? TourOne : TourTwo;

  const attribute = value == "nb_votant" && candidat != "tout" ? candidat : value;

  try {
    const list = await Tour.findAll({
      attributes: [
        place,
        [Sequelize.fn('sum', Sequelize.col(attribute)), value], 
      ],
      group: [place],
      raw: true,
    })

    return res.json(list);

  } catch (error) {

    return res.status(400).json({ error: error.message });
    
  }

};


module.exports = {
  votantsInscrits,
  votesParCandidat,
  dynamique,
  pourcentageBlanc
};