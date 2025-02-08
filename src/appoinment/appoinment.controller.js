import Appointment from "./appoinment.model.js";
import Animal from "../animal/animal.model.js";

export const AddAppoinment = async (req, res) => {
  try {
    let { animalId, date, ...data } = req.body;
    let animal = await Animal.findById(animalId);
    if (!animal) return res.status(404).send({ success: false, message: 'Animal not found' });

    let appointmentDate = new Date(date);
    if (appointmentDate < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).send({ success: false, message: 'Invalid appointment date' });
    }

    if (await Appointment.findOne({ date: appointmentDate })) {
      return res.status(400).send({ success: false, message: 'Appointment already exists for this date' });
    }

    let appointment = new Appointment({ ...data, date: appointmentDate, animal: animal._id });
    await appointment.save();
    return res.status(201).send({ success: true, message: 'Appointment saved successfully', appointment });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'General Error' });
  }
};
