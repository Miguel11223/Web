
    let memorySize = 0;
    let osSize = 0;
    let remainingMemory = 0;
    let memoryBlocks = [];
    let jobs = [];
    let jobQueue = [];
    let memoryChart = null;
    
    // Función para crear la memoria
    function createMemory() {
        let memoryInput = document.getElementById('memorySize').value;
        let memoryUnit = document.getElementById('memoryUnit').value;
        memorySize = convertToKB(memoryInput, memoryUnit);
    
        let osInput = document.getElementById('osSize').value;
        let osUnit = document.getElementById('osUnit').value;
        osSize = convertToKB(osInput, osUnit);
    
        if (osSize > memorySize * 0.30) {
            alert("El tamaño del sistema operativo no puede exceder el 30% de la memoria total.");
            return;
        }
    
        remainingMemory = memorySize - osSize;
        memoryBlocks = [{ start: osSize, size: remainingMemory, occupied: false }];
        updateRemainingMemoryLabel(remainingMemory);
        generateChart();
    }
    
    // Función para agregar trabajos
    function addJob() {
        let jobName = document.getElementById('jobName').value;
        let jobSizeInput = document.getElementById('jobSize').value;
        let jobUnit = document.getElementById('jobUnit').value;
        let jobSizeInKB = convertToKB(jobSizeInput, jobUnit);
    
        let existingJobIndex = jobs.findIndex(job => job.name === jobName);
        if (existingJobIndex !== -1) {
            releaseJob(jobName);
            return;
        }
    
        let assigned = false;
        for (let i = 0; i < memoryBlocks.length; i++) {
            if (!memoryBlocks[i].occupied && memoryBlocks[i].size >= jobSizeInKB) {
                if (memoryBlocks[i].size > jobSizeInKB) {
                    memoryBlocks.splice(i + 1, 0, {
                        start: memoryBlocks[i].start + jobSizeInKB,
                        size: memoryBlocks[i].size - jobSizeInKB,
                        occupied: false
                    });
                }
    
                memoryBlocks[i].size = jobSizeInKB;
                memoryBlocks[i].occupied = true;
                memoryBlocks[i].name = jobName;
                jobs.push({ name: jobName, size: jobSizeInKB, blockIndex: i });
                assigned = true;
                alert(`Trabajo ${jobName} asignado.`);
                break;
            }
        }
    
        if (!assigned) {
            jobQueue.push({ name: jobName, size: jobSizeInKB });
            updateJobQueue();
            alert('Trabajo agregado a la lista de espera.');
        }
    
        generateChart();
    }
    
    // Función para liberar trabajos y verificar la lista de espera
    function releaseJob(jobName) {
        let jobIndex = jobs.findIndex(job => job.name === jobName);
        if (jobIndex === -1) return alert("Trabajo no encontrado.");
    
        let blockIndex = jobs[jobIndex].blockIndex;
        memoryBlocks[blockIndex].occupied = false;
        delete memoryBlocks[blockIndex].name;
    
        jobs.splice(jobIndex, 1);
        compactMemory();
    
        // Intentar asignar un trabajo de la lista de espera al espacio liberado
        assignWaitingJob();
        generateChart();
    }
    
    // Función para intentar asignar un trabajo de la lista de espera
    function assignWaitingJob() {
        for (let i = 0; i < jobQueue.length; i++) {
            let waitingJob = jobQueue[i];
    
            for (let j = 0; j < memoryBlocks.length; j++) {
                if (!memoryBlocks[j].occupied && memoryBlocks[j].size >= waitingJob.size) {
                    if (memoryBlocks[j].size > waitingJob.size) {
                        memoryBlocks.splice(j + 1, 0, {
                            start: memoryBlocks[j].start + waitingJob.size,
                            size: memoryBlocks[j].size - waitingJob.size,
                            occupied: false
                        });
                    }
    
                    memoryBlocks[j].size = waitingJob.size;
                    memoryBlocks[j].occupied = true;
                    memoryBlocks[j].name = waitingJob.name;
                    jobs.push({ name: waitingJob.name, size: waitingJob.size, blockIndex: j });
    
                    jobQueue.splice(i, 1); // Eliminar de la lista de espera
                    updateJobQueue(); // Actualizar visualmente la lista de espera
                    alert(`Trabajo en espera ${waitingJob.name} asignado automáticamente.`);
                    return; // Salir de la función después de asignar un trabajo
                }
            }
        }
    }
    
    // Función para compactar bloques libres
    function compactMemory() {
        for (let i = 0; i < memoryBlocks.length - 1; i++) {
            if (!memoryBlocks[i].occupied && !memoryBlocks[i + 1].occupied) {
                memoryBlocks[i].size += memoryBlocks[i + 1].size;
                memoryBlocks.splice(i + 1, 1);
                i--;
            }
        }
    }
    
    function updateRemainingMemoryLabel(value) {
        document.getElementById('remainingMemoryLabel').textContent = `${value} KB`;
    }
    
    function updateJobQueue() {
        let jobQueueList = document.getElementById('jobQueue');
        jobQueueList.innerHTML = '';
    
        jobQueue.forEach((job, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = `Trabajo ${index + 1} ${job.size} KB`;
            jobQueueList.appendChild(listItem);
        });
    }
    
    function generateChart() {
        if (memoryChart !== null) {
            memoryChart.destroy();
        }
    
        let ctx = document.getElementById('memoryChart').getContext('2d');
        let labels = ['Sistema Operativo'];
        let data = [osSize];
        let backgroundColors = ['rgba(255, 99, 132, 0.2)'];
    
        memoryBlocks.forEach((block, index) => {
            labels.push(block.occupied ? `Trabajo ${block.name}` : `Libre ${index + 1}`);
            data.push(block.size);
            backgroundColors.push(block.occupied ? 'rgba(255, 206, 86, 0.2)' : 'rgba(75, 192, 192, 0.2)');
        });
    
        memoryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Uso de memoria (KB)',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace("0.2", "1")),
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, stacked: true },
                    y: { stacked: true }
                }
            }
        });
    }
    
    function convertToKB(value, unit) {
        if (unit === 'giga') return value * 1024 * 1024;
        if (unit === 'mega') return value * 1024;
        return value;
    }
    
    