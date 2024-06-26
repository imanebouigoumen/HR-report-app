export function showToast() {
    var toast = document.getElementById('toast-success');
    toast.classList.remove('hidden');
    setTimeout(function() {
        toast.classList.add('hidden');
    }, 3000); 
}
export function showToastUpload() {
    var toast = document.getElementById('toast-success-upload');
    toast.classList.remove('hidden');
    setTimeout(function() {
        toast.classList.add('hidden');
    }, 3000); 
}
window.showToast = showToast;
window.showToastUpload = showToastUpload;
