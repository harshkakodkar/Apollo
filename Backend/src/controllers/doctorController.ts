import { Request, Response } from 'express';
import Doctor from '../models/Doctor';


export const addDoctor = async (req: Request, res: Response) => {
  try {
    // Ensure that the id field is not part of the request body
    const { id, ...doctorData } = req.body;

    // Create a new doctor document with the remaining fields
    const doctor = new Doctor(doctorData);

    // Save the doctor to the database
    await doctor.save();

    // Send success response
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error: any) {
    console.error('Error saving doctor:', error);
    res.status(500).json({ error: error.message || 'Error adding doctor' });
  }
};


export const listDoctors = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, city, speciality } = req.query;
    const filters: any = {};

    if (city) filters.city = city;
    if (speciality) filters.speciality = speciality;

    const doctors = await Doctor.find(filters)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Doctor.countDocuments(filters);

    res.json({ page: +page, total, data: doctors });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctors' });
  }
};
