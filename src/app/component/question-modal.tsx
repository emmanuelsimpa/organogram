import { Button } from "@/common/component/button";
import { Input } from "@/common/component/input";
import { useQuestion } from "@/common/hooks/question-hook";
import { Dialog } from "@headlessui/react";
import React from "react";

export function QuestionModal({ onClose }: { onClose: () => void }) {
  const {
    handleInput,
    payload,
    handleEnter,
    showOptions,
    option,
    letters,
    isLoading,
    handleSubmit,
  } = useQuestion({ onClose });
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Post your question
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-lg text-green-950">Instructions:</p>
            <p className="text-xs text-gray-500">
              1. Questions should have a minimum of 3 options and a maximum of 5
              options.
            </p>

            <div className="pt-2">
              <div>
                <Input
                  label="Enter your questions"
                  value={payload.question}
                  onChange={(e) => handleInput("question", e)}
                  name="questions"
                  type="text"
                />

                {showOptions && (
                  <div className="pt-3 space-y-3">
                    <Input
                      label="Enter your options"
                      value={option}
                      onChange={(e) => handleInput("options", e)}
                      name="options"
                      type="text"
                    />
                    <div>
                      {payload.options.map((option, index) => (
                        <div
                          className="flex gap-0.5 text-sm text-green-950"
                          key={index + option}
                        >
                          <p>{letters[index]}.</p>
                          <p>{option}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  {showOptions && (
                    <div className="w-fit">
                      <Button
                        text="Enter"
                        loading={false}
                        onClick={handleEnter}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full gap-3 pt-5">
              <Button
                text="Cancel"
                loading={false}
                color={"disabled"}
                onClick={onClose}
              />
              {payload.options.length > 2 && (
                <Button
                  text="Submit"
                  loading={isLoading}
                  onClick={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
