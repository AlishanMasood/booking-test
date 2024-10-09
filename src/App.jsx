import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "./components/Table";
import { timeSlots, rooms } from "./data";
import { notify } from "./components/Toast";
import { StyledButton, Card, Content } from "./components/StyledComponents";
function App() {
  //creating states for form input
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  //state for confirmation message
  const [confirmation, setConfirmation] = useState("");
  //state for previous bookings if there are any in local storage
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  //function to generate unique Id for each booking
  function generateUniqueId() {
    let uniqueId;
    const hexCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWX";
    uniqueId = "";
    for (let i = 0; i < 6; i++) {
      uniqueId +=
        hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
    }

    return uniqueId;
  }
  //function to check if rooms are availabe on that particular date and time
  const getAvailableRooms = () => {
    if (!selectedDate || !selectedTime) return rooms;

    const formattedDate = selectedDate.toISOString().split("T")[0];

    return rooms.filter((room) => {
      return !bookings.some(
        (booking) =>
          booking.room === room.name &&
          booking.date === formattedDate &&
          booking.time === selectedTime
      );
    });
  };

  //function to handle booking functionality
  const handleBooking = () => {
    if (!selectedRoom || !selectedDate || !selectedTime) {
      notify("error", "Please fill out all forms");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Check if the room is already booked for the selected date and time
    const isRoomAlreadyBooked = bookings.some(
      (booking) =>
        booking.room === selectedRoom &&
        booking.date === formattedDate &&
        booking.time === selectedTime
    );

    if (isRoomAlreadyBooked) {
      notify(
        "error",
        `Sorry, ${selectedRoom} is already booked on ${selectedDate.toDateString()} at ${selectedTime}`
      );
      return; // Prevent booking
    }

    const newBooking = {
      id: generateUniqueId(),
      room: selectedRoom,
      date: formattedDate,
      time: selectedTime,
    };

    setBookings([...bookings, newBooking]);
    notify("success", "Room booked");
    setConfirmation(
      `You have booked ${selectedRoom} on ${selectedDate.toDateString()} at ${selectedTime}`
    );

    setSelectedRoom("");
    setSelectedTime("");
    setSelectedDate(null);
  };

  return (
    <>
      <div className="container mt-5">
        <Card>
          <h4 className="fw-bold mb-4">Room Booking</h4>
          <Content>
            {/* Date Picker */}
            <div className=" d-flex flex-column">
              <label className="form-label">Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                className="form-control"
                // showIcon
                isClearable
                // dayClassName={(date) =>
                //   getDate(date) < Math.random() * 31 ? "random" : undefined
                // }
                placeholderText="Select date"
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="form-label">Select Time:</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="form-select"
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Selection */}
            {selectedDate && selectedTime && (
              <div className="">
                <label className="form-label">Select Room:</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="form-select"
                >
                  <option value="">
                    {getAvailableRooms().length
                      ? "Select a room"
                      : "No rooms Available"}
                  </option>
                  {getAvailableRooms().map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Booking Confirmation */}
            <StyledButton onClick={handleBooking}>Book</StyledButton>
          </Content>
          {confirmation && (
            <div className="alert alert-success mt-4" role="alert">
              {confirmation}
            </div>
          )}
        </Card>
        {bookings.length ? (
          <Table list={bookings} setBookings={setBookings} />
        ) : null}
      </div>
    </>
  );
}
export default App;
