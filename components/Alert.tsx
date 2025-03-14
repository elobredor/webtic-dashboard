import React from 'react';

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    onAccept?: () => void; 
    onReject?: () => void; 
    description: string;
}

export function Alert({ title, isOpen, onClose, onAccept, description, onReject }: ModalProps) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-xl z-10 w-11/12 md:max-w-md mx-auto">
                <div className="border-b px-4 py-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{title || 'Alerta'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {description && (
                    <div className="px-4 py-2 border-b">
                        <h3 className="text-lg text-gray-900">{description}</h3>
                    </div>
                )}
              <div className='flex justify-end'>
                    <div className="flex  py-2 border-t">
                    <button
                        onClick={onReject ? onReject : onClose}
                        className=" text-gray-500 px-2 py-1 rounded"
                    >
                     Cancelar
                    </button>
                    </div>
                <div className="flex  px-4 py-2 border-t">
                    <button
                        onClick={onAccept ? onAccept : onClose}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
                    >
                        Aceptar
                    </button>
                </div>

              </div>
                
            </div>
        </div>
    );
}

export default Alert;
