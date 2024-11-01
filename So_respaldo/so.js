let memorySize = 0;
let osSize = 0;
let remainingMemory = 0;
let partitions = [];
let jobs = [];
let jobQueue = [];

function createMemory() {
    
      // Leer el tamaño de memoria y sistema operativo
        let memoryInput = document.getElementById('memorySize').value;
        let memoryUnit = document.getElementById('memoryUnit').value;
        memorySize = convertToKB(memoryInput, memoryUnit);
    
        let osInput = document.getElementById('osSize').value;
        let osUnit = document.getElementById('osUnit').value;
        osSize = convertToKB(osInput, osUnit);
    
        // Validar que el sistema operativo no exceda el 30% de la memoria
        if (osSize > memorySize * 0.30) {
            alert("El tamaño del sistema operativo no puede exceder el 30% de la memoria total.");
            return;
        }
    
        remainingMemory = memorySize - osSize;
    
        // Actualizar la memoria restante visualmente
        updateRemainingMemoryLabel(remainingMemory);
    
        // Leer el número de particiones
        let numPartitions = document.getElementById('numPartitions').value;
    
        partitions = [];
        let partitionInputs = document.getElementById('partitionInputs');
        partitionInputs.innerHTML = ''; // Limpiar cualquier input anterior
    
        for (let i = 0; i < numPartitions; i++) {
            // Crear un label para el tamaño de partición
            let label = document.createElement('label');
            label.textContent = `Tamaño de partición ${i + 1}`;
    
            // Crear input para el tamaño de partición
            let input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Tamaño de partición ${i + 1}`;
            input.id = `partitionSize${i}`;
    
            // Crear select para la unidad
            let select = document.createElement('select');
            select.id = `partitionUnit${i}`;
            let options = ['giga', 'mega', 'kilo'];
            options.forEach(optionValue => {
                let option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1) + 'B';
                select.appendChild(option);
            });
    
            // Agregar el label, input y select al contenedor de particiones
            partitionInputs.appendChild(label);
            partitionInputs.appendChild(input);
            partitionInputs.appendChild(select);
            partitionInputs.appendChild(document.createElement('br')); // Para que cada conjunto de elementos esté en una nueva línea
        }
    
        // Agregar botón para capturar las particiones ingresadas
        let button = document.createElement('button');
        button.textContent = "Guardar Particiones";
        button.onclick = capturePartitionData; // Llamar a la función para capturar las particiones
        partitionInputs.appendChild(button);  
}




function capturePartitionData() {
    // Capturar los valores de las particiones y guardarlos en el array partitions
    let numPartitions = document.getElementById('numPartitions').value;
    partitions = []; // Reiniciar el array de particiones

    for (let i = 0; i < numPartitions; i++) {
        let partitionSize = document.getElementById(`partitionSize${i}`).value;
        let partitionUnit = document.getElementById(`partitionUnit${i}`).value;
        let partitionSizeInKB = convertToKB(partitionSize, partitionUnit);

        partitions.push({ size: partitionSizeInKB }); // Guardar la partición en el array
    }

    console.log(partitions); // Verificar las particiones capturadas
    alert("Particiones guardadas correctamente.");
}

function updateRemainingMemory() {
    let usedMemory = 0;
    let numPartitions = document.getElementById('numPartitions').value;

    for (let i = 0; i < numPartitions; i++) {
        let partitionSize = document.getElementById(`partitionSize${i}`).value;
        let partitionUnit = document.getElementById(`partitionUnit${i}`).value;
        usedMemory += convertToKB(partitionSize, partitionUnit) || 0; // Convertir a KB y sumar
    }

    let availableMemory = remainingMemory - usedMemory;

    if (availableMemory < 0) {
        alert("Has excedido la memoria disponible. Por favor ajusta los tamaños.");
    }

    // Actualizar la memoria restante visualmente
    updateRemainingMemoryLabel(availableMemory);
}

function updateRemainingMemoryLabel(value) {
    document.getElementById('remainingMemoryLabel').textContent = `${value} KB`;
}

let memoryChart = null; // Para almacenar la referencia del gráfico


function generateChart() {
    // Verificar que las particiones y el SO hayan sido definidas
    if (partitions.length === 0 || osSize === 0) {
        alert("Debes crear la memoria y las particiones primero.");
        return;
    }

    // Si existe un gráfico anterior, destruirlo
    if (memoryChart !== null) {
        memoryChart.destroy();
    }

    let ctx = document.getElementById('memoryChart').getContext('2d');
    
    let labels = ['Sistema Operativo'];
    let data = [osSize];

    partitions.forEach((partition, index) => {
        labels.push(`Partición ${index + 1}`);
        data.push(partition.size);
    });

    // Crear el gráfico
    memoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Uso de memoria (KB)',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // SO
                    'rgba(54, 162, 235, 0.2)', // partición 1
                    'rgba(255, 206, 86, 0.2)', // partición 2
                    'rgba(75, 192, 192, 0.2)', // partición 3
                    'rgba(153, 102, 255, 0.2)', // partición 4
                    'rgba(255, 159, 64, 0.2)'   // partición 5 
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', 
            scales: {
                x: {
                    beginAtZero: true,
                    stacked: true 
                },
                y: {
                    stacked: true 
                }
            }
        }
    });
}

function addJob() 
{
    // Leer el tamaño del trabajo
    let jobName = document.getElementById('jobName').value;
    let jobSizeInput = document.getElementById('jobSize').value;
    let jobUnit = document.getElementById('jobUnit').value;
    let jobSizeInKB = convertToKB(jobSizeInput, jobUnit);

    // Verificar si el trabajo ya existe en alguna partición y liberarlo
    let existingJobIndex = jobs.findIndex(job => job.name === jobName);
    if (existingJobIndex !== -1) {
        // Si el trabajo ya existe, liberar la partición correspondiente
        let existingJob = jobs[existingJobIndex];
        partitions[existingJob.partitionIndex].size += existingJob.size; // Devolver el tamaño a la partición
        jobs.splice(existingJobIndex, 1); // Eliminar el trabajo de la lista de trabajos
        alert(`El trabajo ${jobName} ha sido liberado.`);
        generateChart();
        return; // Salir de la función después de liberar el trabajo
    }

    // Verificar si el trabajo cabe en alguna partición usando el primer ajuste
    let partitionAssigned = false;

    for (let i = 0; i < partitions.length; i++) {
        if (partitions[i].size >= jobSizeInKB) {
            partitions[i].size -= jobSizeInKB; // Asignar trabajo, restando el tamaño a la partición
            jobs.push({ name: jobName, size: jobSizeInKB, partitionIndex: i }); // Agregar el trabajo a la lista
            partitionAssigned = true;
            alert(`Trabajo asignado a la partición ${i + 1}`);
            break;
        }
    }

    // Si no cabe en ninguna partición, agregar a la lista de espera
    if (!partitionAssigned) {
        jobQueue.push({ name: jobName, size: jobSizeInKB });
        updateJobQueue(); // Actualizar visualmente la lista de espera
        alert('Trabajo agregado a la lista de espera.');
    }

    // Actualizar la gráfica con los nuevos tamaños de partición
    generateChart(); // Llamar a la función para regenerar la gráfica con los nuevos datos
}
   
    
    

function updateJobQueue() {
    let jobQueueList = document.getElementById('jobQueue');
    jobQueueList.innerHTML = ''; // Limpiar la lista actual

    jobQueue.forEach((job, index) => {
        let listItem = document.createElement('li');
        listItem.textContent =  `Trabajo${index + 1} ${job.size} KB`;
        jobQueueList.appendChild(listItem);
    });
}



function convertToKB(value, unit) {
    if (unit === 'giga') return value * 1024 * 1024;
    if (unit === 'mega') return value * 1024;
    return value; // Si es en KB
}