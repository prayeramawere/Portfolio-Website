import concurrently from 'concurrently'

concurrently([
    {
        name:'server',
        command:"npm start",
        cwd:"packages/server",
        prefixColor:'yellow'
    },
    {
        name:'client',
        command:'npm run dev',
        cwd:"packages/client",
        prefixColor:'cyan'
    }
])