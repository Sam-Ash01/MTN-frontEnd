import React, { useState } from 'react';
import TrainerInTask from '../trainerInTask/TrainerInTask';
import CategoryContainer from '../categoryContainer/CategoryContainer';

const allCategories = [
    'cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8',
    'cat9', 'cat10', 'cat11', 'cat12', 'cat13', 'cat14', 'cat15', 'cat16'
];

const trainerList = [
    'Trainer1', 'Trainer2', 'Trainer3', 'Trainer4',
    'Trainer5', 'Trainer6', 'Trainer7', 'Trainer8',
    'Trainer9', 'Trainer10'
];

const TrainersBoard = () => {
    const [isResetting, setIsResetting] = useState(false);
    const [availableCategories, setAvailableCategories] = useState(allCategories);
    const [assignedCategories, setAssignedCategories] = useState(() => {
        const initial = {};
        trainerList.forEach((trainer) => {
            initial[trainer] = [];
        });
        return initial;
    });

    const handleDropCategory = (trainerName, category) => {
        if (!availableCategories.includes(category)) return;

        setAvailableCategories((prev) =>
            prev.filter((cat) => cat !== category)
        );

        setAssignedCategories((prev) => ({
            ...prev,
            [trainerName]: [...prev[trainerName], category]
        }));
    };

    const handleReturnCategory = (trainerName, category) => {
        // تأكد أنه غير موجود مسبقًا
        if (!availableCategories.includes(category)) {
            setAvailableCategories((prev) => [...prev, category]);

            setAssignedCategories((prev) => ({
                ...prev,
                [trainerName]: prev[trainerName].filter((cat) => cat !== category),
            }));
        }
    };

    const handleResetAll = () => {
  setIsResetting(true);

  // بعد نصف ثانية، نعيد التعيين ونوقف الأنيميشن
  setTimeout(() => {
    const allAssigned = Object.values(assignedCategories).flat();
    const newAvailable = Array.from(new Set([...availableCategories, ...allAssigned]));

    const newAssigned = {};
    trainerList.forEach((trainer) => {
      newAssigned[trainer] = [];
    });

    setAvailableCategories(newAvailable);
    setAssignedCategories(newAssigned);
    setIsResetting(false);
  }, 500); // المدة متوافقة مع الأنيميشن
};


const hasAssignedCategories = Object.values(assignedCategories).some(arr => arr.length > 0);


    return (
        <div className="flex">

            <CategoryContainer
                categories={availableCategories}
                onReturnCategory={handleReturnCategory}
                onResetAll={handleResetAll}
                hasAssignedCategories={hasAssignedCategories}
            />

            <div className="min-h-screen flex-1">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 justify-items-center">
                    {trainerList.map((trainerName) => (
                        <TrainerInTask
                            key={trainerName}
                            name={trainerName}
                            categories={assignedCategories[trainerName]}
                            onDropCategory={handleDropCategory}
                            isResetting={isResetting}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainersBoard;
