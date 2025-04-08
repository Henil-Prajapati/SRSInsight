document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const statusDiv = document.getElementById('status');
    const resultsDiv = document.getElementById('results');
    const srsForm = document.getElementById('srsForm');

    // Initialize workflow sections
    const systemEngineers = document.getElementById('systemEngineers');
    const testEngineers = document.getElementById('testEngineers');
    const maintenanceEngineers = document.getElementById('maintenanceEngineers');

    // Set initial content for engineers sections
    systemEngineers.innerHTML = `
        <ul>
            <li>Add and modify system specifications</li>
            <li>Implement technical requirements</li>
            <li>Design system architecture</li>
        </ul>
    `;

    testEngineers.innerHTML = `
        <ul>
            <li>Verify system requirements</li>
            <li>Create test cases</li>
            <li>Ensure quality standards</li>
        </ul>
    `;

    maintenanceEngineers.innerHTML = `
        <ul>
            <li>System updates and patches</li>
            <li>Performance optimization</li>
            <li>Technical support</li>
        </ul>
    `;

    // Add form validation
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const functionalitiesInput = document.getElementById('functionalities');

    function validateForm() {
        let isValid = true;
        
        if (!titleInput.value.trim()) {
            showError(titleInput, 'Project title is required');
            isValid = false;
        } else {
            removeError(titleInput);
        }
        
        if (!descriptionInput.value.trim()) {
            showError(descriptionInput, 'Project description is required');
            isValid = false;
        } else {
            removeError(descriptionInput);
        }
        
        if (!functionalitiesInput.value.trim()) {
            showError(functionalitiesInput, 'Key functionalities are required');
            isValid = false;
        } else {
            removeError(functionalitiesInput);
        }
        
        return isValid;
    }
    
    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        element.classList.add('error-input');
        
        // Add shake animation
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
    
    function removeError(element) {
        const formGroup = element.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        element.classList.remove('error-input');
    }

    // Add neon glow effect to buttons
    function addNeonGlow() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.style.boxShadow = '0 0 20px rgba(0, 0, 255, 0.5), 0 0 30px rgba(0, 0, 255, 0.3)';
            });
            
            button.addEventListener('mouseout', () => {
                button.style.boxShadow = '0 0 10px rgba(0, 0, 255, 0.3)';
            });
        });
    }
    
    // Add neon glow effect to inputs
    function addInputGlow() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 15px rgba(79, 195, 247, 0.5)';
            });
            
            input.addEventListener('blur', () => {
                input.style.boxShadow = '0 0 10px rgba(79, 195, 247, 0.3)';
            });
        });
    }
    
    // Initialize glow effects
    addNeonGlow();
    addInputGlow();

    generateBtn.addEventListener('click', async () => {
        if (!validateForm()) {
            return;
        }
        
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const functionalities = functionalitiesInput.value.trim();
        const diagramType = document.getElementById('diagramType').value;

        statusDiv.textContent = 'Generating SRS Document...';
        statusDiv.className = 'status-loading';
        resultsDiv.style.display = 'block';
        
        // Add loading animation
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateBtn.disabled = true;
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    functionalities,
                    diagramType
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                statusDiv.textContent = `Error: ${data.error}`;
                statusDiv.className = 'status-error';
                generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Generate SRS Document';
                generateBtn.disabled = false;
                return;
            }

            statusDiv.textContent = 'SRS Document generated successfully!';
            statusDiv.className = 'status-success';
            displayResults(data);
            downloadBtn.style.display = 'block';
            
            // Reset button
            generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Generate SRS Document';
            generateBtn.disabled = false;
            
            // Add success animation
            const successIcon = document.createElement('i');
            successIcon.className = 'fas fa-check-circle';
            successIcon.style.marginLeft = '10px';
            successIcon.style.color = '#69f0ae';
            statusDiv.appendChild(successIcon);
            
            // Add pulse animation to download button
            downloadBtn.classList.add('pulse');
            setTimeout(() => {
                downloadBtn.classList.remove('pulse');
            }, 2000);
        } catch (error) {
            statusDiv.textContent = `Error: ${error.message}`;
            statusDiv.className = 'status-error';
            console.error('Error:', error);
            
            // Reset button
            generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Generate SRS Document';
            generateBtn.disabled = false;
        }
    });

    function displayResults(data) {
        const diagramDiv = document.getElementById('diagram');
        const resultsDiv = document.getElementById('results');
        
        // Create a container for the SRS content
        const srsContentDiv = document.createElement('div');
        srsContentDiv.className = 'srs-content';
        
        // Add Introduction section
        srsContentDiv.innerHTML += `
            <h2>1. Introduction</h2>
            <h3>1.1 Purpose</h3>
            <p>${data.srs_json.introduction.purpose}</p>
            <h3>1.2 Scope</h3>
            <p>${data.srs_json.introduction.scope}</p>
            <h3>1.3 Definitions</h3>
            <p>${data.srs_json.introduction.definitions}</p>
            <h3>1.4 References</h3>
            <p>${data.srs_json.introduction.references}</p>
            
            <h2>2. Overall Description</h2>
            <h3>2.1 Product Perspective</h3>
            <p>${data.srs_json.overall_description.product_perspective}</p>
            <h3>2.2 User Needs</h3>
            <p>${data.srs_json.overall_description.user_needs}</p>
            <h3>2.3 Assumptions and Dependencies</h3>
            <p>${data.srs_json.overall_description.assumptions_dependencies}</p>
            
            <h2>3. Specific Requirements</h2>
            <h3>3.1 Functional Requirements</h3>
            <ul>
                ${data.srs_json.specific_requirements.functional.map(req => `<li>${req}</li>`).join('')}
            </ul>
            <h3>3.2 Non-Functional Requirements</h3>
            <ul>
                ${data.srs_json.specific_requirements.non_functional.map(req => `<li>${req}</li>`).join('')}
            </ul>
            <h3>3.3 Design Constraints</h3>
            <ul>
                ${data.srs_json.specific_requirements.design_constraints.map(req => `<li>${req}</li>`).join('')}
            </ul>
            
            <h2>4. Stakeholder Analysis</h2>
            <div class="stakeholders">
                ${data.srs_json.stakeholder_analysis.map((stakeholder, index) => `
                    <div class="stakeholder">
                        <h3>4.${index + 1} ${stakeholder.name} (${stakeholder.priority})</h3>
                        <p>${stakeholder.role}</p>
                    </div>
                `).join('')}
            </div>
            
            <h2>5. Risk Analysis</h2>
            ${data.srs_json.risk_analysis.map((risk, index) => `
                <div class="risk">
                    <h3>5.${index + 1} Risk</h3>
                    <p>${risk.risk}</p>
                    <h4>5.${index + 1}.1 Mitigation</h4>
                    <p>${risk.mitigation}</p>
                </div>
            `).join('')}
        `;
        
        // Add the SRS content before the diagram
        resultsDiv.insertBefore(srsContentDiv, diagramDiv);
        
        // Display the diagram if available
        if (data.diagram_html) {
            console.log("Diagram HTML received:", data.diagram_html.substring(0, 100) + "..."); // Log first 100 chars
            diagramDiv.innerHTML = data.diagram_html;
            
            // Add error handling for image loading
            const diagramImage = diagramDiv.querySelector('img');
            if (diagramImage) {
                diagramImage.onerror = function() {
                    console.error("Error loading diagram image. Image source:", this.src.substring(0, 100) + "...");
                    diagramDiv.innerHTML += '<p class="error">Error loading diagram. Please try generating again.</p>';
                };
                
                diagramImage.onload = function() {
                    console.log("Diagram image loaded successfully");
                    // Add fade-in animation to the image
                    diagramImage.style.opacity = '0';
                    diagramImage.style.transition = 'opacity 1s ease';
                    setTimeout(() => {
                        diagramImage.style.opacity = '1';
                    }, 100);
                };
            } else {
                console.error("No image element found in diagram HTML");
                diagramDiv.innerHTML += '<p class="error">No diagram image was generated. Please try again.</p>';
            }
        } else {
            console.log("No diagram HTML received");
            diagramDiv.innerHTML = '<p class="error">No diagram was generated. Please try again.</p>';
        }

        downloadBtn.onclick = () => {
            const downloadUrl = `/download/${encodeURIComponent(data.title)}_SRS.docx`;
            window.location.href = downloadUrl;
        };
    }

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation on scroll for features and workflow sections
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .workflow-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 1s ease infinite;
        }
    `;
    document.head.appendChild(style);
});