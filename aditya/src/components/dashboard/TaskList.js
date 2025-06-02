import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Typography } from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

function TaskList() {
  // Sample tasks - we'll replace with real data later
  const tasks = [
    { id: 1, subject: 'Math', chapter: 'Chapter 1: Algebra', due: 'Today' },
    { id: 2, subject: 'Science', chapter: 'Chapter 3: Physics', due: 'Tomorrow' },
    { id: 3, subject: 'History', chapter: 'Chapter 2: World War II', due: 'Day After' },
  ];

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ borderBottom: '1px solid #eee' }}>
          <ListItemIcon>
            <Checkbox edge="start" />
          </ListItemIcon>
          <ListItemText
            primary={task.chapter}
            secondary={
              <>
                <Typography component="span" variant="body2" color="text.primary">
                  {task.subject}
                </Typography>
                {` — Due ${task.due}`}
              </>
            }
          />
          <BookIcon color="action" />
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;