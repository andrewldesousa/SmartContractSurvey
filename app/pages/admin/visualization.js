import React,{useEffect, useState} from 'react';
import Hashmap from 'hashmap';
import ReactDOM from 'react-dom';
import useSWR from 'swr';
import Spinner from '../../components/spinner';
import { useRouter } from 'next/router';
import {withRouter} from 'next/router';
import {useParams} from 'react-router-dom';
import Chart from '../../components/chart.js';
import {isAuthenticated} from '../api/auth';
import {retrieveResponseCounts} from '../api/retrieve';
import Signin from '../../components/signin';

function requestToAPI (sid){
    //console.log(props.router.query.sid);
    //  let survey_id = useParams();
    const url = 'http://localhost:8000/getResponceCount';
    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey_id : sid })
    }).then((res) => res.json());
}
const spinnerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const Visualization = withRouter((props)=> {
  if (!isAuthenticated()) {
    console.log("not authenticated");
    return <Signin/>;
  } else {
    console.log("authenticated");
    requestToAPI(props);
    //const dataJson = retrieveResponseCounts(surveyId);
    //console.log(dataJson);
    const router = useRouter();
    const [vis, setVis] = useState();
    const [isLoading, setLoad] = useState(true);
    const getData = async (sid)=> {
      requestToAPI(sid).then(data => {
        if (data.error) {
          console.log('Error loding survey data!');
        } else {
          setVis(data);
          setLoad(false);
        }
      })
    };
    useEffect(()=>{
      const Id = props.router.query.sid;
      console.log(Id);
      getData(Id);
    },[props])


    // function useVis() {
    //   // const {data, error} = useSWR(url, fetch(url, {
    //   //   method: 'post',
    //   //   headers: {
    //   //     'Accept': 'application/json',
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({ survey_id : sid })
    //   // }).then((res) => res.json()));
    //   const response = getData(props.router.query.sid);
    //   return {
    //     vis: response,
    //     isLoading: !response,
    //     // isError: error,
    //   };
    // }

    function parseVis(vis) {
      const charts = [];
      const chartsconfig = new Hashmap();
      vis.map((row) => {
        const arrays = chartsconfig.get(row._id.Qid);
        if (arrays) {
          const labels = arrays.get('labels');
          labels.push(row._id.answer);
          arrays.set('labels', labels);
          const data = arrays.get('data');
          data.push(row.count);
          arrays.set('data', data);
        } else {
          const arrays = new Hashmap();
          const labels = [];
          const data = [];
          // arrays.push({'labels': labels, 'data': data});
          labels.push(row._id.answer);
          data.push(row.count);
          arrays.set('labels', labels);
          arrays.set('data', data);
          arrays.set('questionTitle', row._id.Question[0]);
          //  chartsconfig.set('questionTitle', row._id.Question[0]);
          chartsconfig.set(row._id.Qid, arrays);
        }
      });
      chartsconfig.forEach(function(value, key) {
        charts.push(<Chart key ={key} labels = {value.get('labels')}
          data = {value.get('data')} questionTitle={value.get('questionTitle')}
        />);
      });
      return charts;
    }

    if (isLoading) return <div style={spinnerStyle}><Spinner /></div>;
    //if (isError) return <p>{isError}</p>;
    const charts = parseVis(vis);

    return (
      <div>
        {charts}
      </div>

    );
  }
});
export default Visualization;
