"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { get, getDatabase, ref, set } from "firebase/database";
import { app } from '@/lib/firebase';
import { useState } from "react";
import { useToast } from "./ui/use-toast"


export function StudentModal({setStudents, setEditStudent}) {


  const { toast } = useToast()

    const [student, setStudent] = useState({
        email: '',
        name: '',
        roll_no: ''
    })
    const [open, setOpen] = useState(false);


    function writeUserData(e) {
      e.preventDefault();
  
      const db = getDatabase(app);
      const studentRef = ref(db, 'students/' + student.roll_no);
  
      get(studentRef).then((snapshot) => {
          if (snapshot.exists()) {
              console.log('Student already exists with roll number: ' + student.roll_no);
              alert("roll_no already exist")
              // Handle the case where the student already exists
          } else {
              set(studentRef, {
                  name: student.name,
                  email: student.email,
                  roll_no: student.roll_no
              }).then(() => {
                  console.log('Student created successfully.');
                  setEditStudent((prev)=>!prev)
                  //  setStudents((prev) => [...prev, student]);
                   setOpen(false)
                   toast({
                    title: "Student Created Successfully",
                  })
                  // Handle success
              }).catch((error) => {
                  console.error('Error creating student:', error);
                  alert(error)
                  // Handle error
              });
          }
      }).catch((error) => {
          console.error('Error checking student existence:', error);
          // Handle error checking existence
      });
  }
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={writeUserData}>
        
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={student.email}
              onChange={(e) => {
                console.log(e.target.value);
                setStudent((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              defaultValue="student@gmail.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={student.name}
              onChange={(e) => {
                console.log(e.target.value);
                setStudent((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Roll no
            </Label>
            <Input
              id="username"
              type="number"
              value={student.roll_no}
              onChange={(e) => {
                console.log(e.target.value);
                setStudent((prev) => ({
                  ...prev,
                  roll_no: e.target.value,
                }));
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
