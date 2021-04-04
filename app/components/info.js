import React from "react";
import CheckIcon from '@material-ui/icons/Check';
import LinkIcon from '@material-ui/icons/Link';
import useCopyToClipboard from "./copyToClipboard";
import { Icon } from "@material-ui/core";
import { QUESTION_INFO} from './questions/questionTypes';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

export function QuestionInfo(props ) {
    function getInfo(questionType){
        const questionInfo = QUESTION_INFO.map((row) => 
          // <div key = {row.type} id = {row.type}> {row.info}</div>
          {
           if(row.type == questionType){
             
             return row.info
            }
         
        }
          );
    
        return questionInfo
      }
   
  return (
    <Tooltip title={getInfo(props.type)} aria-label="add">
              <InfoIcon />
            </Tooltip>
  );
}
