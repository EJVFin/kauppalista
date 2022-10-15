import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import 'firebase/firestore';
import 'firebase/auth';
import styles from './app.module.scss';
import Header from '../header';
import Content from '../content';
import Items from '../../routes/items';
import Stats from '../../routes/stats';
import Settings from '../../routes/settings';
import AddItem from '../../routes/additem';
import EditItem from '../../routes/edititem';
import Menu from '../menu';
import { ButtonAppContainer } from '../../shared/uibuttons';
import { v4 as uuidv4 } from 'uuid';


function App() {

  
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);

  const user = useUser();

  const itemCollectionRef = useFirestore().collection('user').doc(user.data.uid).collection('item');
  const { data: itemCollection } = useFirestoreCollectionData(itemCollectionRef.orderBy("order"), {initialData: [], idField: "id"});

  const statsDataRef = useFirestore().collection('user').doc(user.data.uid).collection('stats');
  const { data: statsDataCollection } = useFirestoreCollectionData(statsDataRef.orderBy("order"), {initialData: [], idField: "id"});

  useEffect(() => {
    setData(itemCollection);
  }, [itemCollection]); 

  useEffect(() => {
    setStats(statsDataCollection);
  }, [statsDataCollection]); 

  const handleItemSubmit = (newitem) => {
    itemCollectionRef.doc(newitem.id).set(newitem);
  }

  const handleItemDelete = (id) => {
    itemCollectionRef.doc(id).delete(); 
  }

  //Käsittelee checkboxin tilan tallentamisen Firebasen item collectioniin.
  const handleItemComplete = (id) => {
    itemCollectionRef.doc(id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            return doc.ref.update({ checked: !doc.data().checked});
          }
        })
  }

  //käsittelee stats-komponentilta tulevien arvojen tallentamisen
  const handleStatsSubmit = (event) => {
    event.preventDefault();
    const newSum = event.target.elements.sum.value;
    event.target.elements.sum.value = "";
  
    //muodostaa uuden olion stats-taulukkoon ja lisää id-numeron
    const newStat = {
                date: new Date().toLocaleDateString("fi-FI",{day: "numeric", month: "numeric"}), 
                sum: newSum,
                //varmistaa että pylväsgraafin pylväät asettuvat kronologiseen järjestykseen 
                order: new Date()
                }
             
    newStat.id = newStat.id ? newStat.id : uuidv4();
    statsDataRef.doc(newStat.id).set(newStat)
  }
  
  //tyhjentää Firebasen stats-collectionin kokonaan
  function deleteCollection() { 
      statsDataRef.get()
        .then(res => {
          res.forEach(element => {
            element.ref.delete();
          })
        })  
  }
  
  //laskee kaikkien stats taulukon olioiden 'sum'-arvot yhteen
  let total = 0
  statsDataCollection.forEach(statsDataCollection => {total += parseInt(statsDataCollection.sum)} )
  
  //laskee kaikkien stats taulukon olioiden 'sum'-arvojen keskiarvon
  let average = 0
  statsDataCollection.forEach(statsDataCollection => {average += parseInt(statsDataCollection.sum)} )
  let averagespent = average / statsDataCollection.length
  //näyttää 0.00 NaN sijaan jos dataa ei ole
  if (isNaN(averagespent)) {averagespent = 0}

  
  return (
    <ButtonAppContainer>
    <div className={styles.app}>
      <Router>
      <Header />
      <Content> 
        <Route exact path="/">
        <Items data={data} onItemDelete={handleItemDelete} onComplete={handleItemComplete}/>
        </Route>
        <Route path="/stats">
          <Stats data={data} stats={stats} handleStatsSubmit={handleStatsSubmit} total={total} average={averagespent} deleteCollection={deleteCollection}/>
          </Route>
          <Route path="/settings">
            <Settings  />
          </Route>
          <Route path="/add">
            <AddItem onItemSubmit={handleItemSubmit} />
          </Route>
          <Route path="/edit/:id">
            <EditItem onItemSubmit={handleItemSubmit} data={data} onItemDelete={handleItemDelete} />
          </Route>
      </Content>
        <Menu />
      </Router>
    </div>
    </ButtonAppContainer>
  );
}

export default App;
