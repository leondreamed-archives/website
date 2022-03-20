import DaVinciResolveScript as dvr_script
from inspect import getsourcefile
from os.path import abspath
import os
import json

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
dirname = os.path.dirname(abspath(getsourcefile(lambda:0)))
rootPath = os.path.join(dirname, '../../../..')

rendersFolder = os.path.normpath(os.path.join(rootPath, './assets/davinci/composition-renders'))

projectName = os.environ['PROJECT_NAME']
compositionNamesToRender = json.loads(os.environ['COMPOSITION_NAMES_TO_RENDER'])

project = projectManager.LoadProject(projectName)

timeline = project.GetTimelineByIndex(1)
timelineItems = timeline.GetItemListInTrack("video", 1)

# Remove all active render jobs
project.DeleteAllRenderJobs()

project.SetCurrentRenderFormatAndCodec("mov", "ProRes444")

for timelineItem in timelineItems:
	name = timelineItem.GetName()
	if name not in compositionNamesToRender: continue

	start = timelineItem.GetStart()
	# Subtracting 1 from the end or otherwise it renders a frame of the next clip
	end = timelineItem.GetEnd() - 1
	project.SetRenderSettings({
		'MarkIn': start,
		'MarkOut': end,
		'TargetDir': rendersFolder,
		'CustomName': name,
		'ExportAlpha': True
	})
	project.AddRenderJob()

project.StartRendering()

import time

# Waiting until all projects finish rendering (TODO: print render job status using project.GetRenderJobStatus(idx))

def waitForRenders():
	must_end = time.time() + 180 # 3 minute timeout
	while time.time() < must_end:
		if not project.IsRenderingInProgress(): return True
		time.sleep(0.25)
	return False

if not waitForRenders():
	raise Exception("Rendering timeout exceeded.")

