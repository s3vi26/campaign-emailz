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

const Dashboard = () => {
  const classes = useStyles();
  const [emails, setEmails] = useState([]);
  const [message_id, setMessage_id] = useState('');
  const [members, ] = useState(membersData);
  const [messages, ] = useState(messageData);
  const [attribute, setAttribute] = useState('');
  const [beforeDate, setBeforeDate] = useState(new Date());
  const [zipcode, setZipcode] = useState('');
  const [month, setMonth] = useState('');

  const zips = zipcodes(members);

  const submit = async () => {
    console.info('...starting Birthday Campaign');
    switch (attribute) {
      case 'birth_date':
        // get emails for members w/ birth_date in month value
        const dobMatches = await members.filter(member => new Date(member.birth_date).getMonth() === month);
        dobMatches.forEach(match => {
          emails.push(match.email);
        });
        break;
      case 'join_date':
        // get emails for memebers w/ join_date before beforeDate value
        const jdMatches = await members.filter(member => new Date(member.join_date) < beforeDate);
        jdMatches.forEach(match => {
          emails.push(match.email);
        })
        break;
      case 'zip_code':
        // get emails for memebers w/ zip_code in zipcode value
        const zipMatches = await members.filter(member => member.zip_code === zipcode);
        zipMatches.forEach(match => {
          emails.push(match.email);
        })
        break;
        
      default:
        break;
    }
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://qa8lmqoir2.execute-api.us-east-1.amazonaws.com/dev/members/send',
        headers: {
          'Content-Type': "application/json"
        },
        data: {
          emails,
          message_id
        }
      });
      console.log(res);
      setEmails([]);
      setMessage_id('');
      setAttribute('');
      setBeforeDate(new Date());
      setZipcode('');
      setMonth('');
    } catch (e) {
      console.log(e);
    }
  }

  const messageIdChange = (e) => {
    setMessage_id(e.target.value);
  }

  const attributeChange = (e) => {
    setAttribute(e.target.value);
  }

  const monthChange = (e) => {
    setMonth(e.target.value);
  }

  const zipChange = (e) => {
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
            <MenuItem value={0}>Jan</MenuItem>
            <MenuItem value={1}>Feb</MenuItem>
            <MenuItem value={2}>Mar</MenuItem>
            <MenuItem value={3}>Apr</MenuItem>
            <MenuItem value={4}>May</MenuItem>
            <MenuItem value={5}>Jun</MenuItem>
            <MenuItem value={6}>Jul</MenuItem>
            <MenuItem value={7}>Aug</MenuItem>
            <MenuItem value={8}>Sep</MenuItem>
            <MenuItem value={9}>Oct</MenuItem>
            <MenuItem value={10}>Nov</MenuItem>
            <MenuItem value={11}>Dec</MenuItem>
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
                <MenuItem key={zip.toString()} value={zip}>{zip}</MenuItem>
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
