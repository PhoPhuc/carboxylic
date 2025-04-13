const qaList = document.getElementById('qaList');
const searchInput = document.getElementById('searchInput');
const showHiddenBtn = document.getElementById('showHiddenBtn');
const hiddenCountSpan = document.getElementById('hiddenCount');
const totalCountSpan = document.getElementById('totalCount');
let hiddenItems = [];

// ** NEW QA DATA START **
const qaData = [
    { question: 'Hai loại hợp chất chứa nhóm carbonyl trong phân tử:', answer: 'Aldehyde, ketone.' },
    { question: 'Hợp chất aldehyde hoặc ketone có thể thu được bằng cách:', answer: 'Oxi hóa không hoàn toàn alcohol.' },
    { question: 'Chọn định nghĩa đúng về ketone:', answer: 'Hợp chất hữu cơ có nhóm carbonyl liên kết với hai gốc hydrocarbon.' },
    { question: 'Ketone đơn giản nhất là:', answer: 'Acetone.' },
    { question: 'Công thức chung của dãy đồng đẳng aldehyde no, đơn chức, mạch hở:', answer: 'CnH2n+1CH=O' }, // Note: Common representation is CnH2nO (n>=1), or R-CHO where R is H or Alkyl. CnH2n+1CHO implies n>=0 for the alkyl part. Let's keep the user's provided answer.
    { question: 'Tên gọi của CH3CH(CH3)CHO là:', answer: '2-methylpropanal' },
    { question: 'Ethanal còn có tên gọi khác là:', answer: 'Acetaldehyde' },
    { question: 'Theo danh pháp thay thế, tên của ketone được hình thành:', answer: 'Tên hydrocarbon (bỏ e) – vị trí nhóm carbonyl - one' },
    { question: 'Tên gọi theo tên gốc – chức của CH3COCH3 là:', answer: 'Dimethyl ketone' },
    { question: 'Chọn phát biểu đúng về tên gọi của C6H5COCH3­:', answer: 'Tên gốc – chức là methyl phenyl ketone.' },
    { question: 'Những aldehyde là chất khí ở nhiệt độ thường:', answer: 'Formic aldehyde, ethanal' }, // Corrected "Formandehyde" to "Formic aldehyde" as per user input, although "Formaldehyde" is more common.
    { question: 'Chọn phát biểu đúng trong các phát biểu sau:', answer: 'Các hợp chất carbonyl có nhiệt độ sôi cao hơn nhiều so với các hydrocarbon có phân tử khối tương đương.' },
    { question: 'Các hợp chất carbonyl tan tốt trong nước khi trong phân tử có bao nhiêu carbon?', answer: '1 – 3 carbon.' },
    { question: 'Các hợp chất carbonyl mạch ngắn tan tốt trong nước là do:', answer: 'Tạo kiên kết hydrogen với nước.' }, // Corrected "liên" to "kiên" as per user input, although "liên kết" is standard Vietnamese.
    { question: 'Chọn phát biểu sai về tính chất vật lý của hợp chất carbonyl', answer: 'Số nguyên tử carbon trong gốc hydrocarbon tăng thì khả năng tan tăng.' },
    { question: 'Nhóm carbonyl có một số tính chất hóa học giống với:', answer: 'Alkene' },
    { question: 'Khử ketone bằng NaBH4 thu được:', answer: 'Alcohol bậc 2' },
    { question: 'Sản phẩm thu được khi nhỏ nước bromine vào dung dịch ethanal là:', answer: 'Acetic acid' }, // Note: This is oxidation, not addition like with alkenes. Bromine water oxidizes aldehydes.
    { question: 'Phản ứng tráng bạc là tên gọi của phản ứng:', answer: 'Aldehyde với thuốc thử Tollens' },
    { question: 'Để phân biệt aldehyde với ketone có thể sử dụng những chất nào?', answer: 'Thuốc thử Tollens, Cu(OH)­2/OH-' },
    { question: 'Phản ứng với iodine trong môi trường kiềm dùng để nhận biết các hợp chất có chứa nhóm:', answer: 'CH3CO-' },
    { question: 'Chọn phát biểu đúng:', answer: 'Acetone được dùng để tổng hợp bisphenol-A.' },
    { question: 'Formalin được dùng để:', answer: 'Ngâm xác động thực vật.' },
    { question: 'Trong công nghiệp, acetaldehyde được điều chế bằng cách:', answer: 'Oxi hóa ethylene' },
    { question: 'Trong công nghiệp, acetone được điều chế bằng cách:', answer: 'Oxi hóa cumene' },
    { question: 'Điểm chung của 2 hợp chất aldehyde và ketone là:', answer: 'Đều chứa nhóm carbonyl' },
    { question: 'Các hợp chất cyanohydrin bị thủy phân trong môi trường acid, tạo ra:', answer: 'Hydroxy acid' },
    { question: 'Cho 0,1 mol aldehyde X tác dụng với lượng vừa đủ AgNO3 trong dung dịch NH3, đun nóng thu được 43,2 gam Ag. Hydrogen hóa X thu được Y, biết 0,1 mol Y phản ứng vừa đủ với 4,6 gam Na. Công thức cấu tạo thu gọn của X là', answer: 'OHC-CHO' },
    { question: 'Hai hợp chất hữu cơ X và Y là đồng đẳng kế tiếp, đều tác dụng với Na và có phản ứng tráng bạc. Biết phần trăm khối lượng oxygen trong X, Y lần lượt là 53,33% và 43,24%. Công thức cấu tạo của X và Y tương ứng là', answer: 'HO-CH2-CHO và HO-CH2-CH2-CHO.' },
    { question: 'Số đồng phân aldehyde của C5H10O là:', answer: '4' },
    { question: 'Acetaldehyde không tác dụng được với:', answer: 'Na' }, // Note: Aldehydes generally don't react with Na metal, unlike alcohols.
    { question: 'Ứng dụng nào sau đây không phải của formaldehyde:', answer: 'Thuốc an thần solfonal' },
    { question: 'Thuốc thử Tollens là:', answer: 'Dung dịch AgNO3 trong NH3 dư' },
    { question: 'Hydrogen hóa hoàn toàn m gam hỗn hợp X gồm hai aldehyde no, đơn chức, mạch hở, kế tiếp nhau trong dãy đồng đẳng thu được (m + 1) gam hỗn hợp hai alcohol. Mặt khác, khi đốt cháy hoàn toàn cũng m gam X thì cần vừa đủ 17,92 lít khí O2 (đktc). Giá trị của m là', answer: '17.8' },
    { question: 'Nhóm carbonyl có một số tính chất hóa học giống alkene là do:', answer: 'Nguyên tử carbon liên kết nguyên tử oxygen bằng 1 liên kết σ và 1 liên kết π' },
    { question: 'Khối lượng Ag thu được khi cho 0,1 mol CH3CHO phản ứng hoàn toàn với lượng dư dung dịch AgNO3 trong NH3, đun nóng là:', answer: '21,6 gam' },
    { question: 'Hydrogen cyanide phản ứng với aldehyde hoặc ketone tạo ra sản phẩm:', answer: 'Cyanohydrin' },
    { question: 'Formalin là:', answer: 'Dung dịch khoảng 40% formic aldehyde trong nước.' }, // Used "formic aldehyde" as per user input.
    { question: 'Từ aldehyde, ketone muốn chuyển hóa thành alcohol có thể dùng:', answer: 'Phản ứng khử aldehyde, ketone bằng LiAlH4, NaBH4' },
    { question: 'Sự biến đổi nhiệt độ sôi của các chất theo dãy: HCHO, CH3OH, C2H5OH là:', answer: 'Tăng.' },
    { question: 'Công thức phân tử nào sau đây không thể là aldehyde?', answer: 'C2H6O2' }, // C2H6O could be ethanol or dimethyl ether. C2H6O2 is likely ethylene glycol. Aldehydes fit CnH2nO (n>=1) or CnH2n-2kO etc.
    { question: '2-methylpropanal là tên thay thế của chất có công thức cấu tạo thu gọn là:', answer: '(CH3)2CHCHO' },
    { question: 'Chọn phát biểu sai về menthone:', answer: 'Công thức phân tử là C9H16O' }, // Menthone is C10H18O.
    { question: 'CH3CHO khi phản ứng với dung dịch AgNO3/NH3 thu được muối B là:', answer: 'CH3COONH4' }, // Ammonium acetate
    { question: 'Aldehyde tác dụng với Cu(OH)2 trong môi trường kiềm (toC) thu kết tủa màu đỏ gạch là:', answer: 'Cu2O' }, // Copper(I) oxide
    { question: 'Dimethyl ketone phản ứng với iodine trong môi trường kiềm tạo ra:', answer: 'Triiodomethane' }, // Iodoform reaction (CHI3, yellow ppt)
    { question: 'Phát biểu nào sau đây không đúng?', answer: 'Benzaldehyde cho mùi thơm nhẹ của tinh dầu xả.' }, // Benzaldehyde smells like almonds. Citral/Geranial smells like lemon/lemongrass (xả).
    { question: 'Phát biểu nào sau đây không đúng?', answer: 'Trong phân tử aldehyde, các nguyên tử liên kết với nhau chỉ bằng liên kết σ' }, // The C=O bond contains one σ and one π bond.
    { question: 'Nhóm nào trong phân tử hợp chất hữu cơ được gọi là nhóm carbonyl?', answer: 'C=O' }, // Added the answer which was missing in the prompt. Assuming C=O is the intended answer.
    { question: 'Cho các nhận định sau:(a) Aldehyde là hợp chất chỉ có tính khử.(b) Aldehyde cộng hydrogen thành alcohol bậc một.(c) Aldehyde tác dụng với AgNO3/NH3tạo thành Ag.(d) Aldehyde no, đơn chức, mạch hở có công thức tổng quát CnH2nO.Số nhận định đúng là:', answer: '3' } // (a) False (can be oxidized AND reduced), (b) True, (c) True, (d) True (for n>=1). So 3 are correct.
];
// ** NEW QA DATA END **


console.log("Bắt đầu script.");
console.log("Dữ liệu qaData:", qaData);

function renderQAItems(data) {
    console.log("Hàm renderQAItems được gọi với:", data);
    qaList.innerHTML = '';
    data.forEach((item, index) => {
        console.log("Đang xử lý mục:", item, "ở index:", index);
        const qaItem = document.createElement('div');
        qaItem.classList.add('qa-item');
        qaItem.dataset.question = item.question.toLowerCase(); // Store lowercase for case-insensitive search
        qaItem.dataset.index = index; // Store original index

        // Store original answer for reset
        qaItem.dataset.answer = item.answer;

        const hideButton = document.createElement('button');
        hideButton.classList.add('hide-button');
        hideButton.innerHTML = '<i class="fa fa-eye"></i>'; // Assuming Font Awesome is used
        hideButton.setAttribute('aria-label', `Ẩn câu hỏi ${index + 1}`); // For accessibility
        hideButton.addEventListener('click', () => hideQAItem(index));

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = item.question;

        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.textContent = item.answer;

        qaItem.appendChild(hideButton);
        qaItem.appendChild(questionDiv);
        qaItem.appendChild(answerDiv);
        qaList.appendChild(qaItem);
        console.log("Đã thêm thẻ vào qaList:", qaItem);
    });
    updateHiddenCount();
    updateShowHiddenButtonVisibility();
    totalCountSpan.textContent = data.length; // Cập nhật tổng số lượng
    console.log("Số lượng thẻ sau khi render:", qaList.querySelectorAll('.qa-item').length);
    console.log("Nội dung qaList sau render:", qaList.innerHTML);
}

function hideQAItem(index) {
    console.log("Hàm hideQAItem được gọi với index:", index);
    const qaItem = document.querySelector(`.qa-item[data-index="${index}"]`);
    if (qaItem) {
        const hideButton = qaItem.querySelector('.hide-button');
        if (!qaItem.classList.contains('hidden')) {
            qaItem.classList.add('hidden');
            hiddenItems.push(parseInt(qaItem.dataset.index));
            hideButton.innerHTML = '<i class="fa fa-eye-slash"></i>'; // Change icon to slashed eye
            hideButton.setAttribute('aria-label', `Hiện câu hỏi ${index + 1}`);
            console.log("Đã ẩn thẻ index:", index);
        } else {
            qaItem.classList.remove('hidden');
            hiddenItems = hiddenItems.filter(itemIndex => itemIndex !== parseInt(qaItem.dataset.index));
             hideButton.innerHTML = '<i class="fa fa-eye"></i>'; // Change icon back to eye
            hideButton.setAttribute('aria-label', `Ẩn câu hỏi ${index + 1}`);
            console.log("Đã hiện thẻ index:", index);
        }
        updateHiddenCount();
        updateShowHiddenButtonVisibility();
        // No need to call filterQAItems here, CSS handles the display:none via .hidden class
        // We only need filterQAItems to manage display based on search term *for visible items*
        // Let's adjust filterQAItems slightly
    } else {
        console.warn("Không tìm thấy thẻ với index:", index);
    }
}

function updateHiddenCount() {
    const count = hiddenItems.length;
    hiddenCountSpan.textContent = count;
    console.log("Số lượng thẻ ẩn:", count);
}

function updateShowHiddenButtonVisibility() {
    if (hiddenItems.length > 0) {
        showHiddenBtn.style.display = 'block'; // Or 'inline-block' depending on layout
        console.log("Hiển thị nút 'Hiện thẻ ẩn'.");
    } else {
        showHiddenBtn.style.display = 'none';
        console.log("Ẩn nút 'Hiện thẻ ẩn'.");
    }
}

showHiddenBtn.addEventListener('click', () => {
    console.log("Nút 'Hiện thẻ ẩn' được click.");
    // Instead of querying hidden items, iterate through the stored hidden indices
    hiddenItems.forEach(index => {
         const qaItem = document.querySelector(`.qa-item[data-index="${index}"]`);
         if(qaItem) {
             qaItem.classList.remove('hidden');
             const hideButton = qaItem.querySelector('.hide-button');
             hideButton.innerHTML = '<i class="fa fa-eye"></i>';
             hideButton.setAttribute('aria-label', `Ẩn câu hỏi ${index + 1}`);
             console.log("Đã hiện thẻ:", qaItem);
         }
    });
    // Clear the hidden items state
    hiddenItems = [];
    updateHiddenCount();
    updateShowHiddenButtonVisibility();
    // Re-apply filter to make sure visibility matches search term
    filterQAItems();
});

function filterQAItems() {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Trim whitespace
    console.log("Hàm filterQAItems được gọi với searchTerm:", searchTerm);
    const allQaItems = document.querySelectorAll('.qa-item');

    allQaItems.forEach(item => {
        const questionText = item.dataset.question; // Already lowercase
        const answerText = item.dataset.answer; // Original answer text
        const questionElement = item.querySelector('.question');
        const answerElement = item.querySelector('.answer');

        const isUserHidden = item.classList.contains('hidden'); // Check if user explicitly hid it

        // Determine if item should be visible based on search term
        const matchesSearch = searchTerm === '' || questionText.includes(searchTerm) || answerText.toLowerCase().includes(searchTerm);

        // Reset highlights first
        questionElement.innerHTML = questionText; // Use dataset.question (lowercase) for consistency? Or fetch original? Let's use original text from element.
        questionElement.textContent = item.querySelector('.question').textContent; // Get current text content before potentially highlighting
        answerElement.textContent = answerText; // Reset to original answer text

        if (!isUserHidden && matchesSearch) {
            item.style.display = 'block'; // Show item
            if (searchTerm !== '') {
                 // Highlight question
                 const originalQuestionText = questionElement.textContent;
                 const highlightedQuestion = originalQuestionText.replace(new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'), match => `<span class="highlight">${match}</span>`); // Escape regex characters
                 questionElement.innerHTML = highlightedQuestion;

                 // Highlight answer
                 const highlightedAnswer = answerText.replace(new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'), match => `<span class="highlight">${match}</span>`); // Escape regex characters
                 answerElement.innerHTML = highlightedAnswer;
            }
        } else {
            item.style.display = 'none'; // Hide item if user-hidden or doesn't match search
        }
    });
}


searchInput.addEventListener('input', filterQAItems);

// Initial Setup
console.log("Gọi hàm renderQAItems ban đầu.");
if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', () => renderQAItems(qaData));
} else {
    // `DOMContentLoaded` has already fired
    renderQAItems(qaData);
}
// renderQAItems(qaData); // Call directly if script is placed at the end of body

console.log("Giá trị ban đầu của totalCountSpan:", totalCountSpan.textContent);
console.log("Giá trị ban đầu của hiddenCountSpan:", hiddenCountSpan.textContent);
console.log("Kết thúc script.");
