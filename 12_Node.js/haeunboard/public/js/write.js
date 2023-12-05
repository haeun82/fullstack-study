document.getElementById('wirte-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const content = e.target.content.value;
  const img = e.target.img.files[0];
  const formData = new FormData();
  if (!title) {
    return alert('제목을 입력하세요');
  }
  try {
    formData.append('title', title);
    formData.append('content', content);
    formData.append('img', img);
    // const result = await axios.post('/post/write', { title, content });
    const result = await axios.post('/post/write', formData);
    console.log(result.data);

    if (!result.data.flag) {
      return alert(result.data.message);
    }
    location.href = '/post';
  } catch (err) {
    console.log(err);
  }
  e.target.title.value = '';
  e.target.content.value = '';
  e.target.img.files[0] = '';
});