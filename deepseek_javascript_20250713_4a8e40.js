document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('curriculum-container');
    const tooltip = document.getElementById('tooltip');
    const toggleBtn = document.getElementById('toggleRequirements');
    let showRequirements = true;

    // Cargar datos del currículum
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderCurriculum(data);
            setupEventListeners();
        });

    function renderCurriculum(data) {
        container.innerHTML = '';
        
        data.forEach(semester => {
            const semesterEl = document.createElement('div');
            semesterEl.className = 'semester';
            semesterEl.innerHTML = `<h2>${semester.semester}° Semestre</h2><div class="subjects-container"></div>`;
            
            const subjectsContainer = semesterEl.querySelector('.subjects-container');
            
            semester.subjects.forEach(subject => {
                const subjectEl = document.createElement('div');
                subjectEl.className = 'subject';
                subjectEl.dataset.name = subject.name;
                subjectEl.dataset.credits = subject.credits;
                subjectEl.dataset.requirements = JSON.stringify(subject.requirements);
                
                let requirementsHTML = '';
                if (showRequirements && subject.requirements && subject.requirements.length > 0) {
                    requirementsHTML = `
                        <div class="requirements">
                            <strong>Requisitos:</strong>
                            <ul>${subject.requirements.map(req => `<li>${req}</li>`).join('')}</ul>
                        </div>
                    `;
                }
                
                subjectEl.innerHTML = `
                    <div class="credits">${subject.credits} créditos</div>
                    <h3>${subject.name}</h3>
                    ${requirementsHTML}
                `;
                
                subjectsContainer.appendChild(subjectEl);
            });
            
            container.appendChild(semesterEl);
        });
    }

    function setupEventListeners() {
        // Toggle de requisitos
        toggleBtn.addEventListener('click', () => {
            showRequirements = !showRequirements;
            fetch('data.json')
                .then(response => response.json())
                .then(renderCurriculum);
        });

        // Tooltip y resaltado de relaciones
        document.querySelectorAll('.subject').forEach(subject => {
            subject.addEventListener('mouseenter', function(e) {
                const name = this.dataset.name;
                const credits = this.dataset.credits;
                const requirements = JSON.parse(this.dataset.requirements);
                
                // Mostrar tooltip
                tooltip.innerHTML = `
                    <strong>${name}</strong><br>
                    <em>${credits} créditos</em>
                    ${requirements && requirements.length > 0 ? 
                        `<br><br><strong>Requisitos:</strong><br>${requirements.join(', ')}` : ''
                    }
                `;
                tooltip.style.opacity = 1;
                tooltip.style.left = `${e.pageX + 15}px`;
                tooltip.style.top = `${e.pageY + 15}px`;
                
                // Resaltar requisitos
                if (requirements && requirements.length > 0) {
                    document.querySelectorAll('.subject').forEach(el => {
                        if (requirements.includes(el.dataset.name)) {
                            el.classList.add('req-highlight');
                        }
                    });
                }
                
                // Resaltar dependencias
                document.querySelectorAll('.subject').forEach(el => {
                    const reqs = JSON.parse(el.dataset.requirements || '[]');
                    if (reqs.includes(name)) {
                        el.classList.add('dep-highlight');
                    }
                });
            });
            
            subject.addEventListener('mousemove', (e) => {
                tooltip.style.left = `${e.pageX + 15}px`;
                tooltip.style.top = `${e.pageY + 15}px`;
            });
            
            subject.addEventListener('mouseleave', () => {
                tooltip.style.opacity = 0;
                document.querySelectorAll('.subject').forEach(el => {
                    el.classList.remove('req-highlight', 'dep-highlight');
                });
            });
        });
    }
});