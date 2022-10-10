const sortObjectDesc = (obj) => {
    let ArraysOrdreDecs = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    let objOrdreDecs = {};

    ArraysOrdreDecs.forEach(elem => {
        objOrdreDecs = { ...objOrdreDecs, [elem[0]] : elem[1] }
    })

    return objOrdreDecs;
}

const candidatsTour1 = [
    "arthaud_nathalie",
    "roussel_fabian",
    "macron_emmanuel",
    "le_pen_marine",
    "lassalle_jean",
    "zemmour_eric",
    "melenchon_jean_luc",
    "hidalgo_anne",
    "jadot_yannick",
    "pecresse_valerie",
    "poutou_philippe",
    "dupont_aignan_nicolas",
]

const candidatsTour2 = [
    "macron_emmanuel",
    "le_pen_marine",
]

module.exports = {
    sortObjectDesc,
    candidatsTour1,
    candidatsTour2,
};