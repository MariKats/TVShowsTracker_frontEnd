import React from 'react';
import { List } from 'semantic-ui-react';

const SeasonsList = ({seasons, handleClick}) => {
  return(
    <div>
    {
      seasons.sort((a, b) => a.number - b.number).map((s)=> {
        if(s.premiereDate === null) {
          return null
        } else {
          return (
            <List divided verticalAlign='middle' key={s.id}>
              <List.Item >
                <List.Icon name="tv" />
                <List.Content>
                  <List.Header as='a' onClick={handleClick}><p id={s.number}> Season {s.number}</p></List.Header>
                </List.Content>
              </List.Item>
            </List>
          )
        }
      })
    }
    </div>
  )
}

export default SeasonsList;

// <Image avatar src='http://www.freeiconspng.com/uploads/television-png-12.png' />
