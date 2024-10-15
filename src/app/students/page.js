"use client"

import StudentTable from "@/components/StudentTable";
import { StudentModal } from "@/components/StudentModal";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { getDatabase, ref, set, get, child, onValue, off } from "firebase/database";
import { app } from '@/lib/firebase';
import { Label } from "@/components/ui/label";
import { parse } from 'papaparse';
import CircleLoader from "react-spinners/CircleLoader";






export default function page() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editStudent, setEditStudent] = useState(false);

  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (e) => {
    console.log("importing")



    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvString = event.target.result;
      const jsonData = parse(csvString, { header: true });
      jsonData.data.map((data) => {

        console.log(data)
        const db = getDatabase(app);
        const studentRef = ref(db, 'students/' + data.roll_no);

        get(studentRef).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('Student already exists with roll number: ' + data.roll_no);
            // alert("roll_no already exist")
            // Handle the case where the student already exists
          } else {
            set(studentRef, data)
              .then(() => {
                console.log('Student created successfully.');

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
      })
      console.log(jsonData)
      setEditStudent((prev) => !prev)
      // Parse CSV data here and set it to state
      setCsvData(csvString);
    };
    reader.readAsText(file);
  };


  useEffect(() => {
    setLoading(true)
    const db = getDatabase(app);
    const dbRef = ref(db, '/students');
    let student_list = []


    onValue(dbRef, (snapshot) => {
      student_list.length = 0; // Clear the array before updating
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childData)
        student_list.push(childData)
        // ...
      });
      console.log(student_list)
      setStudents(student_list)
    }, {
      onlyOnce: true
    });

    console.log(student_list)
    setLoading(false)

  }, [editStudent])

  return (
    <div>
      <div className="w-full bg-blue-600 h-fit flex justify-end gap-4 py-4">
        <Button>
          <Label htmlFor="import">Import</Label>
          <input id="import" onChange={handleFileUpload} type="file" className="hidden" />
        </Button>
        <StudentModal setStudents={setStudents} setEditStudent={setEditStudent} />
      </div>

      <div className="w-4/5 mx-auto">
        {loading ? <CircleLoader className="mx-auto w-full"/>  :
          <StudentTable students={students} setEditStudent={setEditStudent} />
        }
      </div>
    </div>
  )
}
