import React from 'react';
import Hashmap from 'hashmap';
import ReactDOM from 'react-dom';
import useSWR from 'swr';
import Spinner from '../../components/spinner';
import { useRouter } from 'next/router';
import {withRouter} from 'next/router';
import {useParams} from 'react-router-dom';
import Chart from '../../components/chart.js';
import {isAuthenticated} from '../api/auth';
import Signin from '../../components/signin';

const spinnerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const Visualization = withRouter((props)=> {
  if (!isAuthenticated()) {
    return <Signin/>;}
  else {
  //let survey_id = useParams();
  let url = 'http://localhost:8000/getResponceCount'
  const fetcher = (...args) => fetch(url,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ survey_id : props.router.query.sid})
  }).then((res) => res.json());
  const router = useRouter();
  const { vis, isLoading, isError } = useVis();

  function useVis() {
    const {data, error} = useSWR(url, fetcher);
    return {
      vis: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

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
       // chartsconfig.set('questionTitle', row._id.Question[0]);
        chartsconfig.set(row._id.Qid, arrays);
      }
    });
    console.log(chartsconfig);
    chartsconfig.forEach(function(value, key) {
      console.log(value);
      charts.push(<Chart key ={key} labels = {value.get('labels')}
        data = {value.get('data')} questionTitle={value.get('questionTitle')}
      />);
    });
    return charts;
  }

  if (isLoading) return <div style={spinnerStyle}><Spinner /></div>;
  if (isError) return <p>{isError}</p>;
  const charts = parseVis(vis);

  return (
    <div>
      {charts}
    </div>

  );
}
})
export default Visualization;
