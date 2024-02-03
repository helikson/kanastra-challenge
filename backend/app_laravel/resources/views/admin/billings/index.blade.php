<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Billings</title>
   </head>
   <body class="h-screen w-screen bg-zinc-800 text-white gap-6">
      <h1>Billings</h1>

      @if (session("success"))
         <p>{{ session("success") }}</p>
      @endif

      <form action="{{ route("billings/store") }}" method="POST" enctype="multipart/form-data">
         @csrf
         <label for="csv_file">User File</label>
         <br />
         <input type="file" name="csv_file" id="csv_file" />
         <br />
         <button type="submit">Upload</button>
      </form>

      <table>
         <thead>
            <tr>
               <th>Name</th>
               <th>GovernmentId</th>
               <th>Email</th>
               <th>DebtAmount</th>
               <th>DebtDueDate</th>
               <th>DebtId</th>
               <th>created_at</th>
            </tr>
         </thead>
         <tbody>
            @foreach ($billings as $billing)
               <tr>
                  <td>{{ $billing->name }}</td>
                  <td>{{ $billing->governmentId }}</td>
                  <td>{{ $billing->email }}</td>
                  <td>{{ $billing->debtAmount }}</td>
                  <td>{{ $billing->debtDueDate }}</td>
                  <td>{{ $billing->debtId }}</td>
                  <td>{{ $billing->created_at }}</td>
               </tr>
            @endforeach
         </tbody>
      </table>

      <hr />
      <br/>

      {{ $billings->links() }}
   </body>
</html>