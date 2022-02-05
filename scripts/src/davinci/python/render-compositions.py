# Exports a project from DaVinci Resolve into the /davinci folder

import DaVinciResolveScript as dvr_script
from inspect import getsourcefile
from os.path import abspath
import os

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
dirname = os.path.dirname(abspath(getsourcefile(lambda:0)))
videoExportFolder = os.path.normpath(os.path.join(dirname, '../../../../assets'))
projectName = os.environ['PROJECT_NAME']

project = projectManager.LoadProject(projectName)

timeline = project.GetTimelineByIndex(1)
timelineItems = timeline.GetItemListInTrack("video", 1)

# Remove all active render jobs
project.DeleteAllRenderJobs()

project.SetCurrentRenderFormatAndCodec("mov", "ProRes444")
for timelineItem in timelineItems:
	name = timelineItem.GetName()
	start = timelineItem.GetStart()
	# Subtracting 1 from the end or otherwise it renders a frame of the next clip
	end = timelineItem.GetEnd() - 1
	project.SetRenderSettings({
		'MarkIn': start,
		'MarkOut': end,
		'TargetDir': videoExportFolder,
		'CustomName': name,
	})
	project.AddRenderJob()

project.StartRendering()