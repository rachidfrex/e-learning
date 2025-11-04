const Progress = require('../models/Progress');
const Course = require('../models/Course');

// @desc    Get user progress for a course
// @route   GET /api/progress/:courseId
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({
      user: req.user.id,
      course: req.params.courseId
    }).populate('course', 'title');

    if (!progress) {
      // Create new progress if doesn't exist
      progress = await Progress.create({
        user: req.user.id,
        course: req.params.courseId,
        completedLessons: [],
        quizAttempts: [],
        progressPercentage: 0
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark lesson as complete
// @route   POST /api/progress/:courseId/lesson/:lessonId
// @access  Private
exports.markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    let progress = await Progress.findOne({
      user: req.user.id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user.id,
        course: courseId,
        completedLessons: [],
        quizAttempts: []
      });
    }

    // Check if lesson already completed
    const alreadyCompleted = progress.completedLessons.some(
      lesson => lesson.lessonId.toString() === lessonId
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({ lessonId });
    }

    // Calculate progress percentage
    const course = await Course.findById(courseId);
    const totalLessons = course.lessons.length;
    const completedCount = progress.completedLessons.length;
    progress.progressPercentage = Math.round((completedCount / totalLessons) * 100);
    progress.lastAccessedAt = Date.now();

    await progress.save();

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit quiz attempt
// @route   POST /api/progress/:courseId/quiz/:lessonId
// @access  Private
exports.submitQuizAttempt = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { score, totalQuestions } = req.body;

    let progress = await Progress.findOne({
      user: req.user.id,
      course: courseId
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user.id,
        course: courseId,
        completedLessons: [],
        quizAttempts: []
      });
    }

    progress.quizAttempts.push({
      lessonId,
      score,
      totalQuestions
    });

    progress.lastAccessedAt = Date.now();
    await progress.save();

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all user progress
// @route   GET /api/progress
// @access  Private
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id }).populate('course', 'title thumbnail');
    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
