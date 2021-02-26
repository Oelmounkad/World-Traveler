const app = require("./server");

// PORT
const PORT = process.env.PORT || 4000



// App listening to the port
app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))