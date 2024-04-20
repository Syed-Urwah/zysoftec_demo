"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { app } from '@/lib/firebase';
import { getDatabase, ref, set, get, child, onValue, remove } from "firebase/database";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { StudentModal } from "./StudentModal";
import { StudentModalEdit } from "./StudentModalEdit";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"






export default function StudentTable({ students, setEditStudent }) {

    const { toast } = useToast()

    function handleDelete(roll_no) {
        console.log(roll_no)
        const db = getDatabase(app);
        const studentRef = ref(db, 'students/' + roll_no);

        remove(studentRef, null)
            .then(() => {
                console.log('Data deleted successfully!');
                setEditStudent((prev)=>!prev)
                toast({
                    title: "Student Deleted",
                    variant: "destructive",
                  })
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
            });
    }


    return (
        <Table>
            <TableCaption>list of students.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((data) => (
                    <>
                        <TableRow key={data.roll_no}>
                            <TableCell className="font-medium">{data.email}</TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.roll_no}</TableCell>
                            <TableCell className="text-right flex">
                                <StudentModalEdit studentData={data} setEditStudent={setEditStudent} />
                                <Trash2 className="hover:cursor-pointer" onClick={() => handleDelete(data.roll_no)} />
                            </TableCell>
                        </TableRow>

                    </>
                ))}
            </TableBody>
            
        </Table>
    )
}
