import { useState } from "react";

function ApplicationForm() {

  const [formData, setFormData] = useState({
    applicant_name: "",
    email: "",
    household_size: "",
    monthly_income: "",
    monthly_rent: "",
    requested_amount: "",
    reason: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {

    event.preventDefault();

    setMessage("Submitting application...");

    try {

      const response = await fetch(
        "http://localhost:3001/api/applications",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMessage(
        `Application submitted successfully! Application #${data.id}`
      );

      setFormData({
        applicant_name: "",
        email: "",
        household_size: "",
        monthly_income: "",
        monthly_rent: "",
        requested_amount: "",
        reason: ""
      });

    } catch (error) {

      console.error(error);

      setMessage(
        "There was a problem submitting your application."
      );
    }
  }

  return (

    <section id="apply" className="application">

      <h2>Rental Assistance Application</h2>

      <p>
        Please provide the following information so our team
        can review your request.
      </p>

      <form onSubmit={handleSubmit}>

        <label>
          Full Name
          <input
            type="text"
            name="applicant_name"
            value={formData.applicant_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Household Size
          <input
            type="number"
            name="household_size"
            min="1"
            value={formData.household_size}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Monthly Household Income
          <input
            type="number"
            name="monthly_income"
            min="0"
            step="0.01"
            value={formData.monthly_income}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Monthly Rent
          <input
            type="number"
            name="monthly_rent"
            min="0"
            step="0.01"
            value={formData.monthly_rent}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Amount of Assistance Requested
          <input
            type="number"
            name="requested_amount"
            min="0"
            step="0.01"
            value={formData.requested_amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Please explain your situation
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="6"
            required
          />
        </label>

        <button type="submit">
          Submit Application
        </button>

      </form>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}

    </section>
  );
}

export default ApplicationForm;