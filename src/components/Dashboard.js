import 'date-fns';
import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import membersData from '../data/members.json';
import messageData from '../data/messages.json';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const Dashboard = () => {
  // You can use this file as the Campaign Dashboard
  // Add the campaigns here
  // Write to the console to show what is happening in the app
  const classes = useStyles();
  const [emails, ] = useState([]);
  const [message_id, setMessage_id] = useState('');
  const [members, ] = useState(membersData);
  const [messages, ] = useState(messageData);
  const [attribute, setAttribute] = useState('');
  const [beforeDate, setBeforeDate] = useState(new Date());
  const [zipcode, setZipcode] = useState('');
  const [month, setMonth] = useState('');
  console.log(members);
  console.log(messages);

  const zipcodes = (members) => {
    const zips = [];

    members.forEach(member =>{
      if (zips.includes(member.zip_code)) {
        console.log('already in array. skipping value');
      } else {
        zips.push(member.zip_code)
      }
    });
    return zips;
  }

  const zips = zipcodes(members);

  const submit = async () => {
    console.info('...starting Birthday Campaign');
    switch (attribute) {
      case 'birth_date':
        // get emails for members w/ birth_date in month value
        break;
      
      case 'join_date':
        // get emails for memebers w/ join_date before beforeDate value
        break;
      case 'zip_code':
        // get emails for memebers w/ zip_code in zipcode value
        break;
        
      default:
        break;
    }
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://qa8lmqoir2.execute-api.us-east-1.amazonaws.com/dev/members/send',
        data: {
          emails,
          message_id
        }
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const messageIdChange = (e) => {
    console.log(e.target.value);
    setMessage_id(e.target.value);
  }

  const attributeChange = (e) => {
    console.log(e.target.value);
    setAttribute(e.target.value);
  }

  const monthChange = (e) => {
    console.log(e.target.value);
    setMonth(e.target.value);
  }

  const zipChange = (e) => {
    console.log(e.target.value);
    setZipcode(e.target.value);
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h3 style={{ paddingTop: '20px' }}>Campaigns configurations will go here</h3>
      <FormControl className={classes.formControl}>
        <InputLabel id="message-id-label">Message Id</InputLabel>
          <Select
            labelId="message-id-label"
            value={message_id}
            onChange={messageIdChange}
          >
            {messages.map(message => {
              return(
              <MenuItem key={message.message_id.toString()} value={message.message_id}>{message.message_id}</MenuItem>
              )
            })}
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="tar-att-label">Target Attribute</InputLabel>
          <Select
            labelId="tar-att-label"
            value={attribute}
            onChange={attributeChange}
          >
            <MenuItem value="birth_date">birth_date</MenuItem>
            <MenuItem value="join_date">join_date</MenuItem>
            <MenuItem value="zip_code">zip_code</MenuItem>
          </Select>
      </FormControl>
      {attribute === 'birth_date' && 
        <FormControl className={classes.formControl}>
        <InputLabel id="month-label">In...</InputLabel>
          <Select
            labelId="month-label"
            value={month}
            onChange={monthChange}
          >
            <MenuItem value="01">Jan</MenuItem>
            <MenuItem value="02">Feb</MenuItem>
            <MenuItem value="03">Mar</MenuItem>
            <MenuItem value="04">Apr</MenuItem>
            <MenuItem value="05">May</MenuItem>
            <MenuItem value="06">Jun</MenuItem>
            <MenuItem value="07">Jul</MenuItem>
            <MenuItem value="08">Aug</MenuItem>
            <MenuItem value="09">Sep</MenuItem>
            <MenuItem value="10">Oct</MenuItem>
            <MenuItem value="11">Nov</MenuItem>
            <MenuItem value="12">Dec</MenuItem>
          </Select>
        </FormControl>
      }
      {attribute === 'join_date' &&
        <FormControl className={classes.formControl}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker"
              label="Before..."
              value={beforeDate}
              onChange={date => setBeforeDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      }
      {attribute === 'zip_code' &&
        <FormControl className={classes.formControl}>
        <InputLabel id="date-label">In...</InputLabel>
          <Select
            labelId="date-label"
            value={zipcode}
            onChange={zipChange}
          >
            {zips.map(zip => {
              return(
                <MenuItem value={zip}>{zip}</MenuItem>
              )
            })
            }
          </Select>
        </FormControl>
      }
      <div style={{ paddingTop: '20px' }}>
        This "Start Campaign" button should write to the console to show us who is being sent an email and a stacktrace of what happened
      </div>
      <Button
        variant="outlined"
        style={{ marginTop: '20px' }}
        onClick={submit}
      >
        Start Campaign
      </Button>
    </div>
  )
}

export { Dashboard }
