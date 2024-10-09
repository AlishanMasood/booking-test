import React from "react";

const Table = ({ list, setBookings }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Customer Id</th>
          <th scope="col">Room</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {list?.map((item) => {
          return (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.room}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>
                <div
                  onClick={() => {
                    let savedBookings = JSON.parse(
                      localStorage.getItem("bookings")
                    );
                    let afterFilter = savedBookings.filter(
                      (check) => check.id !== item.id
                    );
                    localStorage.setItem(
                      "bookings",
                      JSON.stringify(afterFilter)
                    );
                    setBookings(afterFilter);
                  }}
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="red"
                    height="1em"
                    width="1em"
                  >
                    <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                  </svg>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
