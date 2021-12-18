import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText, 
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Form", () => {
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  debug()

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  
  console.log(prettyDOM(day));

  console.log(prettyDOM(appointment));
});

xit("loads data, cancels an interview and increases the spots remaining for Monday by  1", async () => {
  // 1. Render the Application.
  const {container} = render(<Application/>);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you want to delete your appointment?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots    remaining".
  expect(getByText(day, "5 spots remaining")).toBeInTheDocument();
});

xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const {container} = render(<Application/>);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // // 4. Check that the Save button is shown.
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    
    // 5. Select the other interviewer.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    fireEvent.click(queryByText(appointment, "Save"));
    
    // 7. Wait until the element with the "Edit" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Edit"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
})
it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  // 1. Render the Application.
  const {container, debug } = render(<Application/>);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment")

  // 3. Click Add Button
  fireEvent.click(getByAltText(appointment[0], "Add"));

  // 4. Enter student name and interviewer
  fireEvent.change(getByPlaceholderText(appointment[0], /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment[0], "Sylvia Palmer"));

  // 5. Hit save
  fireEvent.click(getByText(appointment[0], "Save"));

  // 6. Expect Saving Failed to be in document
  await waitForElement(() => getByText(appointment[0], "Saving Failed"));
  expect(getByText(appointment[0], "Saving Failed")).toBeInTheDocument();
})

it("shows the delete error when failing to delete an existing appointment", async ()  => {
  axios.delete.mockRejectedValueOnce();
  // 1. Render the Application.
  const {container, debug } = render(<Application/>);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  // 2. Wait until the text "Archie Cohen" is displayed.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  // 3. Click Delete Button
  fireEvent.click(getByAltText(appointment, "Delete"));

  // 4. Confirm deleting action 
  await waitForElement(() => getByText(appointment, /Are you sure you would like to delete your appointment?/));
  fireEvent.click(getByText(appointment, "Confirm"));
  
  // 5. Expect Deleting Failed to be in document
  await waitForElement(() => getByText(appointment, "Deleting Failed"));
  expect(getByText(appointment, "Deleting Failed")).toBeInTheDocument();
  })
});
