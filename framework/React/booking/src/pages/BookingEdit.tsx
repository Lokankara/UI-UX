import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Booking } from '../api/model';
import { updateBooking } from '../api/api';

const BookingEdit: React.FC<{ token: string }> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooking() {
      const res = await fetch(`https://restful-booker.herokuapp.com/booking/${id}`, {
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) {
        setError('Failed to fetch booking');
        return;
      }
      const data = await res.json();
      setBooking(data);
    }
    fetchBooking();
  }, [id]);

  if (!booking) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'checkin' || name === 'checkout') {
      setBooking(b => b && ({
        ...b,
        bookingdates: { ...b.bookingdates, [name]: value }
      }));
    } else if (name === 'depositpaid') {
      setBooking(b => b && ({ ...b, depositpaid: checked }));
    } else if (name === 'totalprice') {
      setBooking(b => b && ({ ...b, totalprice: Number(value) }));
    } else {
      setBooking(b => b && ({ ...b, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking || !id) return;

    try {
      await updateBooking(Number(id), booking, token);
      alert('Booking updated');
      navigate('/booking/create');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" value={booking.firstname} onChange={handleChange} required />
      <input name="lastname" value={booking.lastname} onChange={handleChange} required />
      <input
        name="totalprice"
        type="number"
        value={booking.totalprice}
        onChange={handleChange}
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
      />
      <button type="submit">Update Booking</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default BookingEdit;
