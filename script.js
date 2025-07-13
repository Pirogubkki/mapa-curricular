document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('curriculum-container');
    const tooltip = document.getElementById('tooltip');
    const toggleBtn = document.getElementById('toggleRequirements');
    const resetBtn = document.getElementById('reset');
    const englishCheckbox = document.getElementById('english-b1');
    const englishWarning = document.getElementById('english-warning');
    const totalCreditsEl = document.getElementById('total-credits');
    
    let showRequirements = true;
    let approvedSubjects = [];
    let totalCredits = 0;
    let englishB1 = false;
    let curriculumData = [];

    // Cargar datos del currículum
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            curriculumData = data;
            renderCurriculum();
            setupEventListeners();
        });

    function renderCurriculum() {
        container.innerHTML = '';
        
        curriculumData.forEach(semester => {
            const semesterEl = document.createElement('div');
            semesterEl.className = 'semester';
            
            // Deshabilitar semestres 7-10 si no hay nivel B1
            if (semester.semester >= 7 && semester.semester <= 10 && !englishB1) {
                semesterEl.classList.add('disabled');
            }
            
            semesterEl.innerHTML = `<h2>${semester.semester}° Semestre</h2><div class="subjects-container"></div>`;
            
            const subjectsContainer = semesterEl.querySelector('.subjects-container');
            
            semester.subjects.forEach(subject => {
                const subjectEl = document.createElement('div');
                subjectEl.className = 'subject';
                subjectEl.dataset.name = subject.name;
                subjectEl.dataset.credits = subject.credits;
                subjectEl.dataset.requirements = JSON.stringify(subject.requirements);
                subjectEl.dataset.semester = semester.semester;
                
                // Verificar si la materia está aprobada
                if (approvedSubjects.includes(subject.name)) {
                    subjectEl.classList.add('approved');
                }
                
                // Verificar si se cumplen los requisitos
                const requirementsMet = checkRequirements(subject.requirements);
                if (!requirementsMet) {
                    subjectEl.classList.add('disabled');
                }
                
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
                
                // Añadir evento de clic
                subjectEl.addEventListener('click', () => {
                    if (!subjectEl.classList.contains('disabled') && !subjectEl.classList.contains('approved')) {
                        approveSubject(subject.name, parseInt(subject.credits), subjectEl);
                    }
                });
                
                subjectsContainer.appendChild(subjectEl);
            });
            
            container.appendChild(semesterEl);
        });
    }

    function setupEventListeners() {
        // Toggle de requisitos
        toggleBtn.addEventListener('click', () => {
            showRequirements = !showRequirements;
            renderCurriculum();
        });

        // Tooltip y resaltado de relaciones
        document.addEventListener('mouseover', function(e) {
            const subject = e.target.closest('.subject');
            if (!subject) return;
            
            if (subject.classList.contains('disabled')) return;
            
            const name = subject.dataset.name;
            const credits = subject.dataset.credits;
            const requirements = JSON.parse(subject.dataset.requirements || '[]');
            
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
                    if (requirements.includes(el.dataset.name) && !el.classList.contains('disabled')) {
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
        
        document.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.pageX + 15}px`;
            tooltip.style.top = `${e.pageY + 15}px`;
        });
        
        document.addEventListener('mouseout', function(e) {
            if (!e.relatedTarget || !e.relatedTarget.closest('.subject')) {
                tooltip.style.opacity = 0;
                document.querySelectorAll('.subject').forEach(el => {
                    el.classList.remove('req-highlight', 'dep-highlight');
                });
            }
        });

        // Control de inglés B1
        englishCheckbox.addEventListener('change', function() {
            englishB1 = this.checked;
            englishWarning.classList.toggle('hidden', englishB1);
            renderCurriculum();
        });

        // Botón de reinicio
        resetBtn.addEventListener('click', function() {
            approvedSubjects = [];
            totalCredits = 0;
            totalCreditsEl.textContent = '0';
            englishB1 = false;
            englishCheckbox.checked = false;
            englishWarning.classList.remove('hidden');
            renderCurriculum();
        });
    }

    function checkRequirements(requirements) {
        if (!requirements || requirements.length === 0) return true;
        
        for (const req of requirements) {
            // Verificar requisitos de créditos
            if (req.includes('créditos')) {
                const creditMatch = req.match(/\d+/);
                if (creditMatch) {
                    const requiredCredits = parseInt(creditMatch[0]);
                    if (totalCredits < requiredCredits) return false;
                }
            } 
            // Verificar materias requeridas
            else if (!approvedSubjects.includes(req)) {
                return false;
            }
        }
        
        return true;
    }

    function approveSubject(name, credits, element) {
        approvedSubjects.push(name);
        totalCredits += credits;
        totalCreditsEl.textContent = totalCredits;
        element.classList.add('approved');
        
        // Actualizar estado de materias dependientes
        document.querySelectorAll('.subject').forEach(subjectEl => {
            if (!subjectEl.classList.contains('approved') && 
                !subjectEl.classList.contains('disabled')) {
                const requirements = JSON.parse(subjectEl.dataset.requirements || '[]');
                const requirementsMet = checkRequirements(requirements);
                
                subjectEl.classList.toggle('disabled', !requirementsMet);
            }
        });
    }
});
