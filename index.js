const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import thư viện cors


const app = express();
const port = 3000;

const database = require('./database');
const Info = require('./info.js');

// Connect database
database.connect();

app.use(cors());
app.use(bodyParser.json());


app.post('/data', async (req, res) => {
  try {
    const newData = new Info(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: 'Can\'t create new data.' });
  }
});

// Get all data
app.get('/data', async (req, res) => {
  try {
    const allData = await Info.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: 'Can\'t get data.' });
  }
});

// Lấy dữ liệu theo ID
app.get('/data/:id', async (req, res) => {
  try {
    const data = await Info.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin.' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu.' });
  }
});
  


// Chỉnh sửa thông tin
app.put('/data/:id', async (req, res) => {
  try {
    const updatedData = await Info.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin.' });
    }
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật thông tin.' });
  }
});

// Xóa thông tin
app.delete('/data/:id', async (req, res) => {
  try {
    const deletedData = await Info.findByIdAndRemove(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin.' });
    }
    res.json(deletedData);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa thông tin.' });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
