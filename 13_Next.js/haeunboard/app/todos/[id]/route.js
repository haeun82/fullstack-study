export async function GET(req, { params }) {
  console.log(params.id);
  // Dynamic Route

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todo = await res.json();

  return Response.json({ todo })
}

// export async function DELETE(req, { params }) {
//   try {
    
//   } catch (error) {
    
//   }
//   return Response.json({ flag: true, message: '삭제 완료' });

// }