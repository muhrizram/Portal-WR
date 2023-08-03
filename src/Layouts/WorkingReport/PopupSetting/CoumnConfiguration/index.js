import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Card, Grid, IconButton, TextField } from '@mui/material';
import { DragIndicator, Visibility, VisibilityOff } from '@mui/icons-material';
import { split } from '../../../../Component/DownloadConfig/columns';
// import './index.css'

const Item = ({
  element: e,
  active = false,
  disabled = false,
  setNodeRef,
  attributes,
  listeners,
  text,
  onTextChange: handleTextChange = () => false,
  visible,
  onVisibilityChange: handleVisibilityChange = () => false,
}) => {

  return (
    <Grid item component={Card} elevation={active ? 2 : 0}>
      <Grid container ref={setNodeRef} direction="row" alignItems="center" spacing={2}>
        <Grid item>
          {disabled ? (
            <div className='pad' />
          ) : (
            <IconButton {...attributes} {...listeners} size="small">
              <DragIndicator />
            </IconButton>
          )}
        </Grid>
        <Grid item className='itemContent'>
          <TextField fullWidth variant="outlined" margin="dense" label={e.defaultName} value={text} onChange={handleTextChange} />
        </Grid>
        <Grid item>
          {disabled ? (
            <div className='pad' />
          ) : (
            <IconButton size="small" onClick={handleVisibilityChange}>
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const SortableItem = ({ element: e, data: a, disabled = false, text, onTextChange, visible, onVisibilityChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ data: a, id: e.column, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <Item {...{ element: e, disabled, setNodeRef, style, attributes, listeners, text, onTextChange, visible, onVisibilityChange }} />;
};

const ColumnConfiguration = forwardRef(({ defaultItems = split }, ref) => {
  const [activeItem, setActiveItem] = useState(null);
  const [items, setItems] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(defaultItems);
  }, [defaultItems]);

//   useEffect(() => {
//     ref.current = { items };
//   }, [items]);

  const handleDragStart = (e) => {
    const { active: a } = e;

    setActiveItem(items.find(({ column: c }) => c === a.id));
  };

  const handleDragEnd = (e) => {
    const { active: a, over: o } = e;

    if (a.id !== o.id) {
      setItems((p) => {
        const i = p.findIndex(({ column: c }) => c === a.id);
        const j = p.findIndex(({ column: c }) => c === o.id);

        return arrayMove(p, i, j);
      });

      setActiveItem(null);
    }
  };

  const handleTextChange = useCallback(
    (i) => (e) => {
      e.persist();
      setItems((p) => {
        p[i].displayName = e.target.value;

        return [...p];
      });
    },
    []
  );

  const handleVisibilityChange = useCallback(
    (i) => (e) => {
      e.persist();
      setItems((p) => {
        p[i].visible = !p[i].visible;

        return [...p];
      });
    },
    []
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Grid container direction="column" alignItems="stretch" justifyContent="center" spacing={2}>
        {items[0] ? <Item element={items[0]} disabled text={items[0].displayName} onTextChange={handleTextChange(0)} visible /> : null}
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.slice(1, items.length).map((e, i, a) => (
            <SortableItem
              key={e.column}
              element={e}
              data={a}
              text={e.displayName}
              onTextChange={handleTextChange(i + 1)}
              visible={e.visible}
              onVisibilityChange={handleVisibilityChange(i + 1)}
            />
          ))}
        </SortableContext>
      </Grid>
      <DragOverlay>{activeItem ? <Item element={activeItem} text={activeItem.displayName} active /> : null}</DragOverlay>
    </DndContext>
  );
});

export default ColumnConfiguration;





// import React, { useEffect, useState, useContext } from "react";
// import Grid from "@mui/material/Grid";
// import { TextField, Box, IconButton } from "@mui/material";
// import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import {useSortable} from '@dnd-kit/sortable';

// const ColumnConfiguration = () => {
//     const field = [
//         {id: 'date', label: 'Date'},
//         {id: 'start', label: 'Start Time'},
//         {id: 'end', label: 'End Time'},
//         {id: 'location', label: 'Location'}
//     ]

//     const [showField, setShow] = useState(false)
//     const handleShow = () => setShow((show) => !show)
//   return (
//         <Grid container direction="row" sx={{marginTop: '10px'}}>
//             <Grid item xs={12}>
//                 <TextField
//                     className='input-field-crud'
//                     label='No'
//                     sx={{marginBottom:'10px'}}
//                     />
//             </Grid>
//             {/* <Draggable label="Drag with the handle" handle /> */}
//             {field.map((form) => (
//                 <Grid container direction="row" key={form.id} display="flex" alignItems="center" >
//                     <Grid item xs={12}>
//                     <DragIndicatorOutlinedIcon />
//                     <TextField 
//                         className="field-config"
//                         sx={{marginBottom:'10px'}}
//                         label={form.label} id={form.id}
//                         type={showField ? 'text' : 'field'}
//                     />
//                     <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleShow}
//                     >
//                         {showField ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                     </Grid>
//                 </Grid>
//             ))}
//         </Grid>
//   );
// };

// export default ColumnConfiguration;
