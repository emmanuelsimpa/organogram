"use client";
import { Button } from "@/common/component/button";
import { Logo } from "@/common/component/logo";
import ModalWrapper from "@/common/component/modal-wrapper";
import { useDashboard } from "@/common/hooks/dashboard-hook";
import { QuestionModal } from "./component/question-modal";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { EditQuestionModal } from "./component/edit-question-modal";
import { LoadingLogo } from "@/common/component/loading";

export default function Home() {
  const {
    data,
    letters,
    isOpen,
    onClose,
    onOpen,
    handleDelete,
    editDisclosure,
    handleOpenEditModal,
    isLoading,
    load,
  } = useDashboard();

  if (load) {
    return <LoadingLogo />;
  }

  return (
    <main className="flex min-h-screen h-full w-full">
      <div className="flex-1 space-y-8">
        <div className="w-full flex justify-center">
          <Logo />
        </div>

        <div className="h-full w-full shadow-inner border-4 border-green-800 rounded-2xl relative before:absolute before:content-[''] before:w-full before:h-3 before:blur-sm before:bg-green-950 before:top-0 after:absolute after:content-[''] after:w-full after:h-3 after:blur-sm after:bg-green-950 after:bottom-0 ">
          {data && data.length ? (
            <div className="py-5 px-3 text-green-950 text-lg">
              <div className="py-5 px-3 h-full w-full flex justify-end items-center">
                <div className="">
                  <Button
                    text="Click to add more question"
                    loading={false}
                    onClick={onOpen}
                  />
                </div>
              </div>
              {data?.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-2">
                    <p>
                      {index + 1}. {item.question}
                    </p>
                    <div className="">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button>
                          <p className="text-xl font-extrabold">&#8942;</p>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 top-5 mt-2 w-fit z-10 px-5 origin-top-left divide-y divide-gray-100 rounded-md bg-green-100 shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                <button
                                  className="flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-stone-950 hover:bg-green-200"
                                  onClick={() => handleOpenEditModal(item.id)}
                                >
                                  Edit
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-stone-950 hover:bg-green-200"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Remove
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-3 flex-col md:flex-row">
                    {item.options.map((option, i) => (
                      <div className="flex gap-1 " key={i + item.id}>
                        <div className="flex items-center mr-4 mb-4">
                          <input
                            id={`radio-${index}-${i}`}
                            type="radio"
                            name={`radio-${index}`}
                            className="hidden"
                          />
                          <label
                            htmlFor={`radio-${index}-${i}`}
                            className="flex items-center cursor-pointer relative"
                          >
                            <span className="absolute top-1 w-4 h-4 rounded-full inline-block mr-1 border border-grey"></span>
                            <p className="pl-5">
                              {letters[i]?.toLocaleUpperCase()}. {option}
                            </p>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-5 px-3 h-full w-full flex justify-center items-center">
              <div className="">
                <p className="text-green-950 text-center text-lg">
                  No available questions
                </p>
                <Button
                  text="Click to add new question"
                  loading={false}
                  onClick={onOpen}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalWrapper isOpen={isOpen}>
        <QuestionModal onClose={onClose} />
      </ModalWrapper>
      <ModalWrapper isOpen={editDisclosure.isOpen}>
        <EditQuestionModal onClose={editDisclosure.onClose} data={data} />
      </ModalWrapper>
    </main>
  );
}
