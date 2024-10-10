import React, { useState } from 'react';

const PersonalDetailsForm = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [otherGender, setOtherGender] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      height,
      weight,
      gender,
      otherGender,
      age,
    });
  };

  return (
    <div className="form-container">
      <h2>Personal Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="Enter your height (in cm or ft/in)"
          />
        </label>

        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="Enter your weight (in kg or lbs)"
          />
        </label>

        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={(event) => setGender(event.target.value)}
          />
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={(event) => setGender(event.target.value)}
          />
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={gender === 'other'}
            onChange={(event) => setGender(event.target.value)}
          />
          <span>Other (please specify):</span>
          {gender === 'other' && (
            <input
              type="text"
              value={otherGender}
              onChange={(event) => setOtherGender(event.target.value)}
              placeholder="Enter your gender"
            />
          )}
        </label>

        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="Enter your age (in years)"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;