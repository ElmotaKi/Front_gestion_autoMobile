import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

import { Button } from '../ui/button';



function CustomDrawer({ dataLibaghi, textLtrigger }) {
  return (
    <Drawer>
      {console.log(dataLibaghi)}
      <DrawerTrigger>{textLtrigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>{dataLibaghi ? `Agent ID: ${dataLibaghi.id}` : ''}-{dataLibaghi.NomAgent}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomDrawer;
