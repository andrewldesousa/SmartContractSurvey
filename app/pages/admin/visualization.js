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
import { QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES } from '../../components/questions/questionTypes';

function requestToAPI (sid) {
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
          arrays.set('type', row._id.Type);
          //  chartsconfig.set('questionTitle', row._id.Question[0]);
          chartsconfig.set(row._id.Qid, arrays);
        }
      });
      chartsconfig.forEach(function(value, key) {
        if (value.get('type')==(QUESTION_TYPES.NUMERIC ||
          QUESTION_TYPES.SINGLE_CHOICE || QUESTION_TYPES.SLIDER_DISCRETE)) {
          const Oldlabels = value.get('labels');
          const Olddata = value.get('data');
          let Newlabels = [];
          var Newdata = [0,0,0,0,0,0,0,0];
          for (let i=0; i<Oldlabels.length; i++) { // making the labels integer
            Oldlabels[i] = parseInt(Oldlabels[i], 10);
          }
          const maxLabel = Math.max(...Oldlabels);
          const minLabel = Math.min(...Oldlabels);
          const dataBinningLength = maxLabel - minLabel;
          const dataBinningGroupLength = Math.ceil(dataBinningLength / 8);

          if (dataBinningGroupLength > 1) {
            Newlabels[0] = minLabel.toString()+ ' - ' + (minLabel + dataBinningGroupLength).toString();
            Newlabels[1] = (minLabel + dataBinningGroupLength).toString()+ ' - ' +
                  (minLabel + 2 *dataBinningGroupLength).toString();
            Newlabels[2] = (minLabel + 2 * dataBinningGroupLength).toString()+ ' - ' +
                  (minLabel + 3 *dataBinningGroupLength).toString();
            Newlabels[3] = (minLabel + 3 * dataBinningGroupLength).toString()+ ' - ' +
                   (minLabel + 4 *dataBinningGroupLength).toString();
            Newlabels[4] = (minLabel + 4 * dataBinningGroupLength).toString()+ ' - ' +
                  (minLabel + 5 *dataBinningGroupLength).toString();
            Newlabels[5] = (minLabel + 5 * dataBinningGroupLength).toString()+ ' - ' +
                  (minLabel + 6 *dataBinningGroupLength).toString();
            Newlabels[6] = (minLabel + 6 * dataBinningGroupLength).toString()+
                  ' - ' + (minLabel + 7 * dataBinningGroupLength).toString();
            Newlabels[7] = (minLabel + 7 * dataBinningGroupLength).toString()+ ' - ' + (maxLabel).toString();
            console.log(Olddata);
            for (let i=0; i<Oldlabels.length; i++) {
              console.log(minLabel + dataBinningGroupLength);
              console.log(minLabel);
              console.log(Oldlabels[i]);
              switch (true) {
                case ((Oldlabels[i]>=minLabel) && (Oldlabels[i] < (minLabel + dataBinningGroupLength))):
                  console.log("Hellot is 23");
                  Newdata[0] += Olddata[i];
                  break;

                case ((Oldlabels[i]>=minLabel + dataBinningGroupLength )&&
                  (Oldlabels[i] < minLabel + 2 * dataBinningGroupLength)):
                  Newdata[1] += Olddata[i];
                  break;

                case (Oldlabels[i]>=minLabel + 2 * dataBinningGroupLength &&
                  Oldlabels[i] < minLabel + 3 * dataBinningGroupLength):
                  Newdata[2] += Olddata[i];
                  break;

                case (Oldlabels[i]>=minLabel + 3 * dataBinningGroupLength &&
                   Oldlabels[i] < minLabel + 4 * dataBinningGroupLength):
                  Newdata[3] += Olddata[i];
                  break;

                case (Oldlabels[i]>=minLabel + 4 * dataBinningGroupLength &&
                   Oldlabels[i] < minLabel + 5 * dataBinningGroupLength):
                  Newdata[4] += Olddata[i];
                  break;

                case (Oldlabels[i]>=minLabel + 5 * dataBinningGroupLength &&
                   Oldlabels[i] < minLabel + 6 * dataBinningGroupLength):
                  Newdata[5] += Olddata[i];
                  break;

                case (Oldlabels[i]>=minLabel + 6 * dataBinningGroupLength &&
                  Oldlabels[i] < minLabel + 7 * dataBinningGroupLength ):
                  Newdata[6] += Olddata[i];
                  break;
                case (Oldlabels[i]>=minLabel + 7 * dataBinningGroupLength && Oldlabels[i] <= maxLabel ):
                  Newdata[7] += Olddata[i];
                  break;
              }
            }
            console.log("newData");
            console.log(Newdata);
            value.set('labels', Newlabels);
            value.set('data', Newdata);
          }
        }
        if (value.get('type') != (QUESTION_TYPES.TEXT || QUESTION_TYPES.WALLET)) {
          charts.push(<Chart key ={key} labels = {value.get('labels')}
            data = {value.get('data')} questionTitle={value.get('questionTitle')}
          />);
        }
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
