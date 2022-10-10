import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Chart from 'react-apexcharts';
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [candidatsTour1] = useState([
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
  ])
  const [candidatsTour2] = useState([
    "macron_emmanuel",
    "le_pen_marine",
  ])

  //#region: states pour graphe dynamique 2 (comparaison)
  const [candidat1, setCandidat1] = useState("arthaud_nathalie")
  const [candidat2, setCandidat2] = useState("arthaud_nathalie")
 

  const [dynamiqueData1, setDynamiqueData1] = useState([]);
  const [dynamiqueData2, setDynamiqueData2] = useState([]);
  //#endregion

  //#region: states pour graphe dynamique 1
  const [tour, setTour] = useState(1)
  const [place, setPlace] = useState("num_arrond")
  const [value, setValue] = useState("nb_votant")
  const [candidat, setCandidat] = useState("tout");

  const [dynamiqueData, setDynamiqueData] = useState([]);
  //#endregion

  const [pourcentageVoteTour1, setPourcentageVoteTour1] = useState(0);
  const [pourcentageVoteTour2, setPourcentageVoteTour2] = useState(0);
  const [pourcentageBlanc1, setPourcentageBlanc1] = useState(0);
  const [pourcentageBlanc2, setPourcentageBlanc2] = useState(0);
  const [pourcentageParCandidat, setPourcentageParCandidat] = useState({});
  const [pourcentageParCandidat2, setPourcentageParCandidat2] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      const pourcentageTour1 = await axios.get('http://localhost:3001/data/votants-inscrits?tour=1');
      const pourcentageTour2 = await axios.get('http://localhost:3001/data/votants-inscrits?tour=2');
      const pourcentageParCandidat = await axios.get('http://localhost:3001/data/totaux?tour=1');
      const pourcentageParCandidat2 = await axios.get('http://localhost:3001/data/totaux?tour=2');
      const pourcentageBlancCall = await axios.get('http://localhost:3001/data/pourcentage-blanc?tour=1');
      const pourcentageBlancCall2 = await axios.get('http://localhost:3001/data/pourcentage-blanc?tour=2');
      const result = await axios.all([pourcentageTour1, pourcentageTour2, pourcentageParCandidat, pourcentageParCandidat2, pourcentageBlancCall, pourcentageBlancCall2]);
      const [ { data : votantsTour1 } , { data : votantsTour2 }, { data : pourcentageCandidats }, { data : pourcentageCandidats2 }, { data : pourcentageBlanc }, { data : pourcentageBlanc2 } ] = result;
      setPourcentageVoteTour1(votantsTour1);
      setPourcentageVoteTour2(votantsTour2);
      setPourcentageParCandidat(pourcentageCandidats);
      setPourcentageParCandidat2(pourcentageCandidats2);
      setPourcentageBlanc1(pourcentageBlanc);
      setPourcentageBlanc2(pourcentageBlanc2);

      setIsLoading(false);
    }

    fetchData();
    console.log("first useeffect");

    

  }, []);

  useEffect(() => {

    const fetchDynamic = async () => {

      const {data} = await axios.get(`http://localhost:3001/data/dynamique?tour=${tour}&place=${place}&value=${value}&candidat=${candidat}`)
      setDynamiqueData(data);
    }

    fetchDynamic()
    console.log("second useeffect");
    
  }, [tour, place, value, candidat])
 
  useEffect(() => {

    const fetchDynamic = async () => {

      const candidat1Call = await axios.get(`http://localhost:3001/data/dynamique?tour=${tour}&place=num_arrond&value=nb_votant&candidat=${candidat1}`)
      const candidat2Call = await axios.get(`http://localhost:3001/data/dynamique?tour=${tour}&place=num_arrond&value=nb_votant&candidat=${candidat2}`)
      const result = await axios.all([candidat1Call, candidat2Call]);
      const [ { data : dataCandidat1 } , { data : dataCandidat2 }] = result;
      setDynamiqueData1(dataCandidat1);
      setDynamiqueData2(dataCandidat2);
    }

    fetchDynamic();
    console.log("third useeffect");
    
  }, [tour, candidat1, candidat2])
  
  

  return (

    <>
      {isLoading 
        ? <p>loading...</p>
        : <Box sx={{ padding: "50px" }}>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <Item>
                <h2><b>{pourcentageVoteTour1.toFixed(2)}%</b> </h2>
                Pourcentage de participation 1er tour
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item>
                <h2><b>{pourcentageVoteTour2.toFixed(2)}%</b> </h2>
                Pourcentage de participation 2eme tour
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item>
                <h2><b>{pourcentageBlanc1.toFixed(2)}%</b> </h2>
                Pourcentage des votes blanc 1er tour
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item>
                <h2><b>{pourcentageBlanc2.toFixed(2)}%</b> </h2>
                Pourcentage des votes blanc 2eme tour
              </Item>
            </Grid>
            <Grid justifyContent="center" xs={6}>
              <Item>
                <Chart  
                  options={{ 
                    labels: Object.keys(pourcentageParCandidat), 
                    colors: [
                      '#ff0000',
                      '#0000ff',
                      '#ffff00',
                      '#00ff80',
                      '#ff00ff',
                      '#00ffff',
                      '#0080ff',
                      '#8000ff',
                      '#ff8000',
                      '#80ff00',
                      '#ff0080',
                      '#00ff00',
                      ]
                  }}  
                  series={Object.values(pourcentageParCandidat).map(str => Number(str))}  
                  type="pie" 
                  width="490"   
                />
              </Item>
            </Grid>
            
            <Grid xs={6}>
              <Item>
                <Chart  
                  options={{ 
                    labels: Object.keys(pourcentageParCandidat2), 
                    colors: [
                      '#ff0000',
                      '#ff8000',
                      '#ffff00',
                      '#80ff00',
                      '#00ff00',
                      '#00ff80',
                      '#00ffff',
                      '#0080ff',
                      '#0000ff',
                      '#8000ff',
                      '#ff00ff',
                      '#ff0080'
                    ] 
                  }}  
                  series={Object.values(pourcentageParCandidat2).map(str => Number(str))}  
                  type="pie" 
                  width="468" 
                />
              </Item>
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Tour</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={tour}
                  onChange={(e) => {
                    setTour(e.target.value);
                    setCandidat("tout");
                    setCandidat1("macron_emmanuel");
                    setCandidat2("le_pen_marine");
                  }}
                >
                  <FormControlLabel value="1" control={<Radio />} label="1er" />
                  <FormControlLabel value="2" control={<Radio />} label="2eme" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <Item>
                
                <FormControl sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label">Valeur</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Valeur"
                    onChange={(e) => setValue(e.target.value)}
                  >
                    <MenuItem value={"nb_votant"}>nb votes</MenuItem>
                    <MenuItem value={"nb_vote_null"}>nb votes null</MenuItem>
                    <MenuItem value={"nb_vote_blanc"}>nb votes blanc</MenuItem>
                    <MenuItem value={"nb_inscrit"}>nb inscrits</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label-place">place</InputLabel>
                  <Select
                    labelId="demo-simple-select-label-place"
                    id="demo-simple-select"
                    value={place}
                    label="place"
                    onChange={(e) => setPlace(e.target.value)}
                  >
                    <MenuItem value={"num_arrond"}>num arrondissement</MenuItem>
                    <MenuItem value={"num_quartier"}>num quartier</MenuItem>
                    <MenuItem value={"num_sec"}>num secteur</MenuItem>
                    <MenuItem value={"num_circ"}>num circ</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} disabled={ value !== "nb_votant" }>
                  <InputLabel id="demo-simple-select-label-candidat">Candidat</InputLabel>
                  {tour === 1
                  ? <Select
                    labelId="demo-simple-select-label-candidat"
                    id="demo-simple-select-candidat"
                    value={candidat}
                    label="candidat"
                    onChange={(e) => setCandidat(e.target.value)}
                  >
                    <MenuItem key={"tout"} value={"tout"}>Tout candidats</MenuItem>
                    {candidatsTour1.map(cand => <MenuItem key={cand} value={cand}>{cand}</MenuItem>)}
                  </Select>
                  : <Select
                    labelId="demo-simple-select-label-candidat"
                    id="demo-simple-select-candidat"
                    value={candidat}
                    label="candidat"
                    onChange={(e) => setCandidat(e.target.value)}
                  >
                    <MenuItem key={"tout"} value={"tout"}>Tout candidats</MenuItem>
                    {candidatsTour2.map(cand => <MenuItem key={cand} value={cand}>{cand}</MenuItem>)}
                  </Select> }
                </FormControl>
                
                <Chart  
                  options={ {
                    
                    chart: {
                      height: 350,
                      type: 'bar',
                      toolbar: {
                        export: {
                          csv: {
                            filename: `${value}_${place}_${candidat}`,
                            headerCategory: place.substring(4),
                            columnDelimiter: ';',
                          }
                        },
                      },
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 10,
                        columnWidth: '50%',
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    stroke: {
                      width: 2
                    },
                    
                    grid: {
                      row: {
                        colors: ['#fff', '#f2f2f2']
                      }
                    },
                    xaxis: {
                      labels: {
                        rotate: -45
                      },
                      categories: dynamiqueData.map(elem => elem[Object.keys(elem)[0]]),
                      tickPlacement: 'on',
                      title: {
                        text: place.substring(4)
                      }
                    },
                    yaxis: {
                      title: {
                        text: value === 'nb_inscrit' ? 'Inscrits' : 'Votes',
                      },
                    },
                    tooltip: {
                      x: {
                        formatter: function (val) {
                          return place.substring(4) + " " + val
                        }
                      },
                      
                    },
                    fill: {
                      type: 'gradient',
                      gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                      },
                    }
                  }}  
                  series={[{
                    name: 'Votes',
                    data: dynamiqueData.map(elem => Number(elem[Object.keys(elem)[1]]))
                  }]}  
                  type="bar" 
                />
              </Item>
              </Grid>
              <Grid xs={6}>
                
              <Item>
              <FormControl sx={{ m: 1 }} >
                  <InputLabel id="demo-simple-select-label-candidat">Candidat 1: </InputLabel>
                  {tour === 1
                  ? <Select
                    labelId="demo-simple-select-label-candidat"
                    id="demo-simple-select-candidat"
                    value={candidat1}
                    label="candidat 1"
                    onChange={(e) => setCandidat1(e.target.value)}
                  >
                    {candidatsTour1.map(cand => <MenuItem key={cand} value={cand}>{cand}</MenuItem>)}
                  </Select>
                  : <Select
                    labelId="demo-simple-select-label-candidat"
                    id="demo-simple-select-candidat"
                    value={candidat1}
                    label="candidat"
                    onChange={(e) => setCandidat1(e.target.value)}
                  >
                    {candidatsTour2.map(cand => <MenuItem key={cand} value={cand}>{cand}</MenuItem>)}
                  </Select> }
                </FormControl>
                <FormControl sx={{ m: 1 }} >
                  <InputLabel id="demo-simple-select-label-candidat">Candidat 2: </InputLabel>
                  {tour === 1
                  ? <Select
                    labelId="demo-simple-select-label-candidat"
                    id="demo-simple-select-candidat"
                    value={candidat2}
                    label="candidat 2"
                    onChange={(e) => setCandidat2(e.target.value)}
                  >
                    <MenuItem key={"tout"} value={"tout"}>Tout candidats</MenuItem>
                    {candidatsTour1.map(cand => <MenuItem key={cand} value={cand}>{cand}</MenuItem>)}
                  </Select>
                  : <Select
                    labelId="demo-simple-select-label-candidat"
                    id="demo-simple-select-candidat"
                    value={candidat2}
                    label="candidat"
                    onChange={(e) => setCandidat2(e.target.value)}
                  >
                    <MenuItem key={"tout"} value={"tout"}>Tout candidats</MenuItem>
                    {candidatsTour2.map(cand => <MenuItem key={cand} value={cand}>{cand}</MenuItem>)}
                  </Select> }
                </FormControl>
                <Chart     
                series={[{
                  name: 'Candidat 1',
                  data: dynamiqueData1.map(elem => Number(elem[Object.keys(elem)[1]]))
                }, {
                  name: 'Candidat 2',
                  data: dynamiqueData2.map(elem => Number(elem[Object.keys(elem)[1]]))
                }]}
                type='bar'
            options={{
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  tools: {
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                  },
                  export: {
                    csv: {
                      filename: `${candidat1}_vs_${candidat2}`,
                      headerCategory: 'Votes',
                      columnDelimiter: ';',
                    }
                  },
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded'
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                title: {
                  text: 'Arrondissement'
                },
                categories: dynamiqueData1.map(elem => elem[Object.keys(elem)[0]]),
              },
              yaxis: {
                title: {
                  text: 'Votes'
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                x: {
                  formatter: function (val) {
                    return "arrondissement " + val
                  }
                },
                y: {
                  formatter: function (val) {
                    return val + " votes"
                  }
                }
              }
            }
          
          
          } />
              </Item>
            </Grid>
          </Grid>
        </Box>
      }
    </>
  )
}

export default App