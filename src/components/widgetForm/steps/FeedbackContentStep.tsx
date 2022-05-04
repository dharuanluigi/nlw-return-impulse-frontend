import {ArrowLeft, Camera} from 'phosphor-react';
import { FormEvent, useState } from 'react';
import {FeedbackType, feedbackTypes} from '..';
import {CloseButton} from '../../CloseButton';
import { ScreenShotButton } from '../ScreenShotButton';

interface FeedbackContentStepProps {
    feedbackType: FeedbackType,
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const feedbackInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute left-5 top-5 text-zinc-400 hover:text-zinc-100"
          onClick={() => onFeedbackRestartRequested()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackInfo.image.source} alt={feedbackInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte os detalhes..."
        />

        <footer className="flex mt-2 gap-2">

          <ScreenShotButton screenshot={screenshot} onScreenShotTook={setScreenshot}  />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:hover:bg-brand-500 disabled:cursor-not-allowed"
            disabled={comment.length === 0}
          >
            Enviar feedback
          </button>
        </footer>

      </form>
    </>
  );
}
