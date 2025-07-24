import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../api/api';
import type { Booking } from '../api/model';

const BookingCreate: React.FC = () => {
  const [booking, setBooking] = useState<Booking>({
    firstname: '',
    lastname: '',
    totalprice: 0,
    depositpaid: false,
    bookingdates: { checkin: '', checkout: '' },
    additionalneeds: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'checkin' || name === 'checkout') {
      setBooking((b) => ({
        ...b,
        bookingdates: { ...b.bookingdates, [name]: value },
      }));
    } else if (name === 'depositpaid') {
      setBooking((b) => ({ ...b, depositpaid: checked }));
    } else if (name === 'totalprice') {
      setBooking((b) => ({ ...b, totalprice: Number(value) }));
    } else {
      setBooking((b) => ({ ...b, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createBooking(booking);
      alert('Booking created with ID: ' + result.bookingid);
      navigate('/booking/edit/' + result.bookingid);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" value={booking.firstname} onChange={handleChange} placeholder="First Name" required />
      <input name="lastname" value={booking.lastname} onChange={handleChange} placeholder="Last Name" required />
      <input
        name="totalprice"
        type="number"
        value={booking.totalprice}
        onChange={handleChange}
        placeholder="Total Price"
        required
      />
      <label>
        Deposit Paid:
        <input
          name="depositpaid"
          type="checkbox"
          checked={booking.depositpaid}
          onChange={handleChange}
        />
      </label>
      <input
        name="checkin"
        type="date"
        value={booking.bookingdates.checkin}
        onChange={handleChange}
        required
      />
      <input
        name="checkout"
        type="date"
        value={booking.bookingdates.checkout}
        onChange={handleChange}
        required
      />
      <input
        name="additionalneeds"
        value={booking.additionalneeds}
        onChange={handleChange}
        placeholder="Additional Needs"
      />
      <button type="submit">Create Booking</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default BookingCreate;
